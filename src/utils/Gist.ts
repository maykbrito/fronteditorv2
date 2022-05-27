export const doesURLIncludesGist = window.location.pathname.includes('/gists')
export const isGistViewOnly = window.location.pathname.includes('/view')

export const getGist = async () => {
  const { pathname } = window.location

  const gist = await fetch(
    `https://api.github.com/gists/${pathname.replace(
      /(\/gists\/|\/view)/gi,
      '',
    )}`,
  )

  const json = await gist.json()
  const { files } = json

  const values = {
    html: files['index.html'] ? files['index.html'].content : '',
    css: files['index.css'] ? files['index.css'].content : '',
    javascript: files['index.js'] ? files['index.js'].content : '',
    markdown: files['index.md'] ? files['index.md'].content : '',
  }

  return values
}
