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

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/prism'


import type { Tab } from '../MEditor/TabButton';
let previewRenderTimer: NodeJS.Timeout;

interface PreviewProps {
	selectedTab?: Tab;
}

export default function Preview({ selectedTab }: PreviewProps) {
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
		}, [app, isLiveReloadEnabled, hasUnsafeCode]);

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
							if (selectedTab === 'markdown') {
								return (
									<div className="h-full flex-1 overflow-auto p-6 bg-white/2 dark:bg-[#0f0f14]">
										<ReactMarkdown remarkPlugins={[remarkGfm]}>{app.markdown || ''}</ReactMarkdown>
									</div>
								);
							}
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

			<div className="h-full flex-1 overflow-auto">
			  {selectedTab === 'markdown' ? (
				<div className="markdown-preview p-6 bg-white/5 dark:bg-[#0f0f14] h-full overflow-auto">
				  <ReactMarkdown
					remarkPlugins={[remarkGfm]}
					components={{
						code({ children, className }) {
							const match = /language-(\w+)/.exec(className || '');
							const codeText = String(children).replace(/\n$/, '');

							if (match) {
								return (
									<SyntaxHighlighter
										PreTag="div"
										language={match[1]}
										style={dracula}
									>
										{codeText}
									</SyntaxHighlighter>
								);
							}
							return <code className={`${className} text-gray-700 bg-gray-200`}>{children}</code>;
						},
						h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} 
						id={getIdFromHeading(node?.children)} />,
						h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-4" {...props} 
						id={getIdFromHeading(node?.children)} />,
						h3: ({node, ...props}) => <h3 className="text-xl font-bold my-4" {...props} 
						id={getIdFromHeading(node?.children)} />,
						h4: ({node, ...props}) => <h4 className="text-lg font-bold my-4" {...props} 
						id={getIdFromHeading(node?.children)} />,
						h5: ({node, ...props}) => <h5 className="text-base font-bold my-4" {...props} 
						id={getIdFromHeading(node?.children)} />,
						h6: ({node, ...props}) => <h6 className="text-sm font-bold my-4" {...props} 
						id={getIdFromHeading(node?.children)} />,
						p: ({node, ...props}) => <p className="my-2 leading-7" {...props} />,
						a: ({node, ...props}) => <a className="text-blue-500 underline" {...props} />,
						li: ({node, ...props}) => <li className="ml-6 list-disc" {...props} />,
						ul: ({node, ...props}) => <ul className="my-2" {...props} />,
						ol: ({node, ...props}) => <ol className="my-2 list-decimal" {...props} />,
						blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4 text-gray-500" {...props} />,
						hr: ({node, ...props}) => <hr className="my-4 border-gray-600" {...props} />,
						table: ({node, ...props}) => <table className="w-full table-auto my-4 border-collapse border border-gray-600" {...props} />,
						th: ({node, ...props}) => <th className="border border-gray-600 bg-gray-700 px-4 py-2 text-left" {...props} />,
						td: ({node, ...props}) => <td className="border border-gray-600 px-4 py-2" {...props} />,
						tr: ({node, ...props}) => <tr className="hover:bg-gray-800" {...props} />
					}}
					>
						{app.markdown || ''}
						</ReactMarkdown>
				</div>
			  ) : (
				<PreviewIframe src={src} />
			  )}
			</div>
		</div>
	);
}

const getIdFromHeading = (children: unknown): string => {
	// Guard: children must be an array
	if (!Array.isArray(children) || children.length === 0) return "";

	const texts: string[] = [];

	const collectText = (node: unknown) => {
		if (node == null) return;

		// plain string node
		if (typeof node === "string") {
			texts.push(node);
			return;
		}

		// object node - try to pull 'value' if it's a string
		if (typeof node === "object") {
			const obj = node as Record<string, unknown>;
			if (typeof obj.value === "string") {
				texts.push(obj.value);
			}

			// if it has children, recurse
			if (Array.isArray(obj.children)) {
				for (const child of obj.children) collectText(child);
			}
		}
	};

	for (const child of children) collectText(child);

	const full = texts.join(" ").trim();
	if (!full) return "";
	return full.replace(/\s+/g, "-").toLowerCase();
};