import { useCallback, useContext, useEffect, useState } from "react";
import {
	EditorContentContext,
	editorHotkeys,
} from "../../contexts/EditorContentContext";
import { base64EncodeUnicode } from "../../utils/base-64-encode-unicode";
import { formatCodeToIframe } from "../../utils/FormatCodeToIframe";
import type { StorageKeys } from "../../utils/Storage";
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

	const renderPreview = useCallback(() => {
		const keys = ["html", "css", "javascript"] as StorageKeys[];

		let codeToIframe = keys.reduce((acc: string, language) => {
			const value = app[language] || "";
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

	return (
		<div className="w-full h-full flex flex-col">
			<Header
				windowTitle={previewTitle}
				windowIcon={pageIcon}
				onLiveReloadToggle={setIsLiveReloadEnabled}
			/>

			<div className="h-full flex-1">
				<PreviewIframe src={src} />
			</div>
		</div>
	);
}
