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
}
