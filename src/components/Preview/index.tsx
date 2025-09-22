import { useCallback, useContext, useEffect, useState } from "react";
import {
	EditorContentContext,
	editorHotkeys,
} from "../../contexts/EditorContentContext";
import { base64EncodeUnicode } from "../../utils/base-64-encode-unicode";
import { SimpleLoopDetector } from "../../utils/CodeSafetyAnalyzer";
import { formatCodeToIframe } from "../../utils/FormatCodeToIframe";
import type { StorageKeys } from "../../utils/Storage";
import { SimpleNotification } from "../SafetyNotification";
import { Header } from "./Header";
import { PreviewIframe } from "./preview-iframe";

let previewRenderTimer: NodeJS.Timeout;

export default function Preview() {
	const params = new URLSearchParams(window.location.search);
	const previewOnly = Boolean(params.get("previewOnly"));

	const { app } = useContext(EditorContentContext);

	const [isLiveReloadEnabled, setIsLiveReloadEnabled] = useState(true);
	const [previewTitle, setPreviewTitle] = useState("index.html");
	const [pageIcon, setPageIcon] = useState("");
	const [src, setSrc] = useState("");
	const [warningMessage, setWarningMessage] = useState<string | null>(null);
	const [hasUnsafeCode, setHasUnsafeCode] = useState(false);

	const renderPreview = useCallback(() => {
		const keys = ["html", "css", "javascript"] as StorageKeys[];
		const jsCode = app.javascript || "";

		// Verifica se há loops infinitos no código JavaScript
		let safeJsCode = jsCode;
		let codeIsUnsafe = false;

		if (jsCode.trim()) {
			const safetyCheck = SimpleLoopDetector.checkCode(jsCode);
			if (!safetyCheck.isSafe) {
				// Código perigoso detectado
				safeJsCode = "";
				codeIsUnsafe = true;

				// Desabilita o live reload automaticamente
				if (isLiveReloadEnabled) {
					setIsLiveReloadEnabled(false);
				}

				setWarningMessage(
					"⚠️ Loop infinito detectado! Live reload foi desabilitado por segurança.",
				);
			} else {
				// Código seguro
				if (!isLiveReloadEnabled && hasUnsafeCode) {
					setIsLiveReloadEnabled(true);
					setWarningMessage(null);
				} else {
					setWarningMessage(null);
				}
			}
		} else {
			// Código JavaScript vazio
			if (!isLiveReloadEnabled && hasUnsafeCode) {
				setIsLiveReloadEnabled(true);
				setWarningMessage(null);
			} else {
				setWarningMessage(null);
			}
		}

		setHasUnsafeCode(codeIsUnsafe);

		let codeToIframe = keys.reduce((acc: string, language) => {
			let value = app[language] || "";

			// Usa código JavaScript seguro
			if (language === "javascript") {
				value = safeJsCode;
			}

			const formatted = formatCodeToIframe(value);
			const result = acc + formatted[language];
			return result;
		}, "");

		const pageTitle = app.html?.match(/<title>(?<title>.+)<\/title>/);
		const pageIcon = app.html?.match(
			/rel=['"](?:shortcut )?icon['"] href=['"](?<icon>[^?'"]+)[?'"]/,
		);

		codeToIframe = base64EncodeUnicode(codeToIframe);
		codeToIframe = `data:text/html;charset=utf-8;base64,${codeToIframe}`;

		setSrc(codeToIframe);
		setPreviewTitle(pageTitle?.groups?.title ?? "index.html");
		setPageIcon(pageIcon?.groups?.icon ?? "");
	}, [app]);

	useEffect(() => {
		if (isLiveReloadEnabled) {
			clearTimeout(previewRenderTimer);

			previewRenderTimer = setTimeout(() => {
				renderPreview();
			}, 1000);
		}
	}, [renderPreview, isLiveReloadEnabled]);

	useEffect(() => {
		editorHotkeys.addEventListener("save", renderPreview);

		return () => {
			editorHotkeys.removeEventListener("save", renderPreview);
		};
	}, [renderPreview]);

	if (previewOnly) {
		return <PreviewIframe src={src} />;
	}

	// Função para lidar com toggle do live reload com verificação de segurança
	const handleLiveReloadToggle = useCallback(
		(enabled: boolean) => {
			if (enabled) {
				// Verifica o código em tempo real no momento do clique
				const jsCode = app.javascript || "";
				if (jsCode.trim()) {
					const safetyCheck = SimpleLoopDetector.checkCode(jsCode);
					if (!safetyCheck.isSafe) {
						// Código ainda perigoso - não permite reativar
						setWarningMessage(
							"❌ Não é possível reativar o live reload enquanto houver loops infinitos no código.",
						);
						return;
					}
				}
			}
			setIsLiveReloadEnabled(enabled);
		},
		[app.javascript],
	);

	return (
		<div className="w-full h-full flex flex-col">
			<Header
				windowTitle={previewTitle}
				windowIcon={pageIcon}
				isLiveReloadEnabled={isLiveReloadEnabled}
				onLiveReloadToggle={handleLiveReloadToggle}
			/>

			{/* Aviso de segurança */}
			{warningMessage && (
				<div className="px-4 pt-2">
					<SimpleNotification message={warningMessage} />
				</div>
			)}

			<div className="h-full flex-1">
				<PreviewIframe src={src} />
			</div>
		</div>
	);
}
