export const doesURLIncludesGithub =
	window.location.pathname.includes("github.com");
export const isGithubViewOnly = window.location.pathname.includes("/view");
// https://api.github.com/repos/maykbrito/fronteditor-projects/contents/css-intro/01-first-steps/writting-css
export const getGithub = async () => {
	const { pathname } = window.location;
	const url = pathname.replace(/(\/github.com\/|\/blob\/|\/main\/)/gi, "");
	let [owner, repo, ...paths] = url.split("/");
	repo = repo.replace(".git", "");
	const path = paths.join("/").replace("/view", "");
	const rawUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

	const files = {} as Record<string, { content: string }>;

	try {
		const response = await fetch(rawUrl);
		const jsonResponse = await response.json();
		for (const file of jsonResponse) {
			const content = await fetch(file.download_url);
			const contentText = await content.text();
			files[file.name] = {
				content: contentText,
			};
		}

		const values = {
			html: files["index.html"] ? files["index.html"].content : "",
			css: files["index.css"] ? files["index.css"].content : "",
			javascript: files["index.js"] ? files["index.js"].content : "",
			markdown: files["index.md"] ? files["index.md"].content : "",
		};

		return values;
	} catch (error) {
		console.log("Não foi possível encontrar o repositório ou arquivos");
		console.log(error);
	}
	return false;
};
