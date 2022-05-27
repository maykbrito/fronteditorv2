const initialState = {
  html: '',
  css: '',
  javascript: '',
  markdown: '',
}

export type StorageState = typeof initialState

export type StorageKeys = keyof typeof initialState

// each url will be a new content
const app = `fronteditor:${window.location.pathname.replace('/', '')}`

const add = (value: typeof initialState) => {
  localStorage.setItem(app, JSON.stringify(value))
}

const gistIsViewOnly = () => {
  const { pathname } = window.location

  if (!pathname.includes('view')) return false

  return true
}

const getGist = async () => {
  const { pathname } = window.location

  if (!pathname.includes('gists')) return false

  try {
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
    add(values)
    return values
  } catch (error) {
    return false
  }
}

const setGist = async (values: typeof initialState) => {
  const { pathname } = window.location

  try {
    const gist = await fetch(
      `https://api.github.com/gists/${pathname.replace('/', '')}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // think this token must be by user and not by app
          // 'Authorization': `token ${process.env.REACT_APP_GIST_TOKEN}`,
        },
        body: JSON.stringify({
          files: {
            'index.html': {
              content: values.html,
            },
            'index.css': {
              content: values.css,
            },
            'index.js': {
              content: values.javascript,
            },
            'index.md': {
              content: values.markdown,
            },
          },
        }),
      },
    )
    const json = await gist.json()
    return json
  } catch (error) {
    return false
  }
}

const get = (): typeof initialState => {
  const value = localStorage.getItem(app) || JSON.stringify(initialState)
  return JSON.parse(value)
}

const getItem = (item: StorageKeys) => {
  const values = get()
  return values[item] || ''
}

const remove = () => localStorage.removeItem(app)

export default {
  add,
  get,
  getItem,
  remove,
  getGist,
  setGist,
  gistIsViewOnly,
}
