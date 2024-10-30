<p align="center">
    <img src="./src/assets/logo.svg" align="center" width="50">
</p>
<p align="center"><h1 align="center">FRONTEDITOR.DEV</h1></p>
<p align="center">
	<em>Empower creativity with seamless code editing!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/maykbrito/fronteditorv2?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/maykbrito/fronteditorv2?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/maykbrito/fronteditorv2?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

---
## Preview Demo

https://raw.githubusercontent.com/maykbrito/fronteditorv2/refs/heads/main/.github/preview.mp4

---

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Tecnologies](#-technologies)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ Thanks](#-thanks)

---

##  Overview

Fronteditor is a cutting-edge open-source project designed to streamline web development workflows. It simplifies code editing and live previewing, enhancing user experience and productivity. Ideal for developers seeking efficient content creation and seamless integration of external resources. Empower your web projects with Fronteditor's intuitive features and flexible customization options.

---

##  Features
- **Code Editing**: Effortlessly edit and preview HTML, CSS, and JavaScript code.
- **Live Preview**: Witness real-time updates as you code.
- **Customization**: Tailor the editor to your preferences using those [url params](#url-params).
- **User-Friendly**: Intuitive interface for a seamless experience.
- **Unlimited Projects**: You can use pathname `/anything` to start a new empty project

### URL Params
- hideTabs: html | css | javascript | markdown
- logo: false
- previewOnly: true
- vertical: true
- editorOnly: true
- reverse: true
- theme: vs | vs-dark
- lineNumbers: on | off

---

## Tecnologies

- **Programming Language**: TypeScript
- **Package Manager**: Npm, Yarn
- **UI Framework**: React
- **Styling**: Tailwind CSS, Shadcn-ui
- **Code Editor**: Monaco Editor

---

##  Project Structure

```sh
└── fronteditorv2/
    ├── README.md
    ├── biome.json
    ├── components.json
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── src
    │   ├── App.tsx
    │   ├── assets
    │   ├── components
    │   ├── contexts
    │   ├── hooks
    │   ├── lib
    │   ├── main.tsx
    │   ├── styles
    │   ├── utils
    │   └── vite-env.d.ts
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vercel.json
    ├── vite.config.ts
    └── yarn.lock
```


###  Project Index
<details open>
	<summary><b><code>FRONTEDITORV2/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/tsconfig.node.json'>tsconfig.node.json</a></b></td>
				<td>- Enables TypeScript configuration for Node.js environment in the project<br>- Supports ESNext module format and Node module resolution<br>- Defines base URL and path aliases for cleaner imports<br>- Includes Vite configuration file for build setup.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/package.json'>package.json</a></b></td>
				<td>- Facilitates project build, development, and linting tasks<br>- Manages dependencies and scripts for Vite, TypeScript, ESLint, and TailwindCSS<br>- Enables seamless development experience and efficient codebase maintenance.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/components.json'>components.json</a></b></td>
				<td>- Define project aliases and configurations for styling, TypeScript, and Tailwind CSS in the components.json file<br>- This file sets up key project settings like component paths and global styles, enhancing code organization and maintainability within the architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/vercel.json'>vercel.json</a></b></td>
				<td>Redirects all incoming requests to the root path, ensuring a consistent entry point for the project.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/biome.json'>biome.json</a></b></td>
				<td>- Defines configuration settings for code formatting, linting, and file organization<br>- Specifies rules for JavaScript formatting, linter configurations, and file overrides<br>- Organizes imports, sets formatting styles, and enables/disables specific linting rules<br>- Includes overrides for specific file paths.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
				<td>- Defines TypeScript compiler settings for the project, targeting ESNext with strict type checking and module resolution for Node<br>- Maps aliases for paths in the source code directory<br>- Integrates with React JSX syntax and references a separate tsconfig file for Node-specific settings.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/postcss.config.js'>postcss.config.js</a></b></td>
				<td>- Configures PostCSS plugins Tailwind CSS and Autoprefixer for the project's build process, ensuring consistent styling and browser compatibility<br>- This file plays a crucial role in defining the CSS processing pipeline within the project architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/tailwind.config.js'>tailwind.config.js</a></b></td>
				<td>- Enhances Tailwind CSS configuration by enabling JIT mode, dark mode support, and customizing grid columns, border radius, and colors<br>- Includes the Tailwind CSS Animate plugin for additional functionality<br>- The file specifies the content paths for stylesheets, contributing to a more efficient and tailored styling setup within the project architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/index.html'>index.html</a></b></td>
				<td>- The index.html file serves as the entry point for the front-end editor, defining the structure and initial content of the web page<br>- It includes essential metadata, links to external resources, and references the main TypeScript file for the application logic<br>- This file sets the foundation for the user interface and functionality of the editor within the project architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/vite.config.ts'>vite.config.ts</a></b></td>
				<td>Configures Vite to use React and sets up an alias for the project's source directory.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- src Submodule -->
		<summary><b>src</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/vite-env.d.ts'>vite-env.d.ts</a></b></td>
				<td>- Defines Vite client types for the project, ensuring seamless integration with Vite's development server<br>- This declaration in vite-env.d.ts enhances the codebase architecture by providing necessary type references for Vite's client-side functionality.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/main.tsx'>main.tsx</a></b></td>
				<td>- Renders the React application by creating a root element and rendering the main App component within a StrictMode wrapper<br>- This file serves as the entry point for the React application, initializing the rendering process and setting up the initial UI structure.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/App.tsx'>App.tsx</a></b></td>
				<td>- Enables content editing within a structured context by providing an editor component wrapped in a content context provider<br>- This setup ensures seamless management and interaction with the editor content throughout the application.</td>
			</tr>
			</table>
			<details>
				<summary><b>lib</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/lib/utils.ts'>utils.ts</a></b></td>
						<td>Enhances class value handling by merging and combining CSS classes efficiently.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>components</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/components/CustomEditor.tsx'>CustomEditor.tsx</a></b></td>
						<td>- Defines a responsive code editor component that integrates Monaco Editor for HTML, CSS, JavaScript, or Markdown<br>- Handles editor initialization, content changes, and display options based on URL parameters and user interactions<br>- Utilizes context for state management and storage for persistent data<br>- Supports dynamic line number visibility and customizable theming.</td>
					</tr>
					</table>
					<details>
						<summary><b>Preview</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/components/Preview/preview-iframe.tsx'>preview-iframe.tsx</a></b></td>
								<td>- The `PreviewIframe` function renders an iframe element to display a preview of content specified by the `src` prop<br>- This component plays a crucial role in the project's architecture by enabling the seamless integration of external content within the application's interface.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/components/Preview/index.tsx'>index.tsx</a></b></td>
								<td>- Generates a live preview of HTML, CSS, and JavaScript code input by the user<br>- Utilizes React hooks to manage state and trigger updates<br>- Supports live reload functionality and displays the preview in an iframe<br>- Handles page title and icon extraction for a more interactive user experience.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/components/Preview/Header.tsx'>Header.tsx</a></b></td>
								<td>- The Header component renders a customizable window title with an optional icon and a live reload toggle switch<br>- It allows users to enable or disable automatic page reloading<br>- The component's design and functionality enhance the user experience by providing visual cues and interactive controls for managing live reload settings.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>ui</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/components/ui/button.tsx'>button.tsx</a></b></td>
								<td>- Defines a Button component with customizable variants and sizes for UI consistency<br>- Integrates with React and Radix UI, offering flexibility in styling and functionality<br>- Promotes reusability and maintainability across the codebase architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/components/ui/resizable.tsx'>resizable.tsx</a></b></td>
								<td>Defines resizable panel components for flexible UI layout management within the project architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/components/ui/switch.tsx'>switch.tsx</a></b></td>
								<td>- Defines a custom Switch component using React and Radix UI<br>- The component handles styling and behavior for a toggle switch element<br>- It enhances accessibility and user interaction by providing a visually appealing and functional switch interface<br>- This component encapsulates switch functionality for seamless integration within the project's UI components.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/components/ui/dropdown-menu.tsx'>dropdown-menu.tsx</a></b></td>
								<td>- Facilitates creation of customizable dropdown menus with various interactive elements like items, checkboxes, and radio buttons<br>- Enables easy integration of dropdown functionality into React applications, enhancing user experience and interface flexibility within the project's UI components.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>DropdownMenu</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/components/DropdownMenu/download-zip.tsx'>download-zip.tsx</a></b></td>
								<td>- Generates a downloadable zip file containing HTML, CSS, JavaScript, and Markdown files from the editor content<br>- Parses HTML, adds scripts, and creates a zip file with the content<br>- Enables users to download the zip file with the frontend editor content.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/components/DropdownMenu/index.tsx'>index.tsx</a></b></td>
								<td>- Implements a dropdown menu component for user interactions, featuring options like downloading files and accessing account settings<br>- The component enhances user experience by providing a visually appealing and functional menu interface within the project's architecture.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>MEditor</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/components/MEditor/TabButton.tsx'>TabButton.tsx</a></b></td>
								<td>- Defines a reusable TabButton component for selecting different tabs within the editor interface<br>- It handles tab selection based on user interaction and updates the visual styling to indicate the currently selected tab<br>- This component enhances the user experience by providing a clear and intuitive way to navigate between different content tabs in the editor.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/components/MEditor/index.tsx'>index.tsx</a></b></td>
								<td>- Enables dynamic rendering of a multi-tab editor interface with optional preview mode<br>- Handles tab selection, editor-only view, and resizable panel layout based on URL parameters<br>- Supports customization through tab configuration and displays a logo with external link<br>- Integrates with external components for enhanced functionality.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>contexts</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/contexts/EditorContentContext.tsx'>EditorContentContext.tsx</a></b></td>
						<td>- Manages the state and functionality of the editor, including loading grammars, handling value changes, and defining editor themes<br>- Integrates with Monaco Editor and emmet-monaco-es for a seamless editing experience<br>- Handles key commands for saving and initializes editor settings upon mount.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>styles</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/styles/global.css'>global.css</a></b></td>
						<td>- Define global styles and configurations for the project, including Tailwind CSS utilities and base styles<br>- Set root variables and apply base styles to the body element.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>utils</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/utils/monaco-tm-registry.ts'>monaco-tm-registry.ts</a></b></td>
						<td>- Defines a registry for Monaco TextMate grammars, enabling syntax highlighting for JavaScript, CSS, HTML, and Markdown files within the codebase<br>- The registry fetches and provides grammar definitions based on the file's scope, enhancing the editor's language support.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/utils/base-64-encode-unicode.ts'>base-64-encode-unicode.ts</a></b></td>
						<td>Encode Unicode strings to base64 for secure data transmission in the project architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/utils/Gist.ts'>Gist.ts</a></b></td>
						<td>- The `Gist.ts` file in the `utils` directory provides functions to check if the URL includes a gist, determine if it's a view-only gist, and fetch gist content from the GitHub API<br>- This code facilitates the retrieval of HTML, CSS, JavaScript, and Markdown content for a gist based on the URL path.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/utils/Storage.ts'>Storage.ts</a></b></td>
						<td>- Manages and stores content for the front-end editor in local storage<br>- Handles adding, retrieving, and removing content based on the current URL path<br>- The file defines initial state structure and functions for interacting with the stored data.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/utils/FormatCodeToIframe.ts'>FormatCodeToIframe.ts</a></b></td>
						<td>- FormatCodeToIframe.ts in src/utils/ serves to transform code snippets into iframe-ready formats<br>- It structures the input code into HTML, CSS, and JavaScript segments for seamless embedding into iframes within the project architecture.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>hooks</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/maykbrito/fronteditorv2/blob/master/src/hooks/useToggle.ts'>useToggle.ts</a></b></td>
						<td>- Enables toggling functionality with customizable initial state and onChange callback<br>- Maintains the current state and triggers the callback when toggled<br>- Enhances reusability and flexibility in managing toggle states across components.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

Before getting started with fronteditorv2, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Npm, Yarn


###  Installation

Install fronteditorv2 using one of the following methods:

**Build from source:**

1. Clone the fronteditorv2 repository:
```sh
❯ git clone https://github.com/maykbrito/fronteditorv2
```

2. Navigate to the project directory:
```sh
❯ cd fronteditorv2
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```


**Using `yarn`** &nbsp; [<img align="center" src="" />]()

```sh
❯ yarn install
```

###  Usage
Run fronteditorv2 using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm run dev
```


**Using `yarn`** &nbsp; [<img align="center" src="" />]()

```sh
❯ yarn dev
```

---
##  Project Roadmap

- [ ] **`User Account`**: Add user account.
- [ ] **`Copilot`**: Use IA to act as copilot.

---

##  Contributing

- **🐛 [Report Issues](https://github.com/maykbrito/fronteditorv2/issues)**: Submit bugs found or log feature requests for the `fronteditorv2` project.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/maykbrito/fronteditorv2
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/maykbrito/fronteditorv2/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=maykbrito/fronteditorv2">
   </a>
</p>
</details>

---

##  Thanks

You can support this project by giving it a ⭐️ on GitHub.

---
