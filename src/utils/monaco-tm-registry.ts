import { Registry } from 'monaco-textmate'

export const registry = new Registry({
  getGrammarDefinition: async (scopeName) => {
    if (scopeName === 'source.js') {
      return {
        format: 'json',
        content: await (
          await fetch('src/assets/monaco-grammars/JavaScript.tmLanguage.json')
        ).text(),
      }
    } else if (scopeName === 'source.css') {
      return {
        format: 'json',
        content: await (
          await fetch('src/assets/monaco-grammars/css.tmLanguage.json')
        ).text(),
      }
    } else if (scopeName === 'source.html') {
      return {
        format: 'json',
        content: await (
          await fetch('src/assets/monaco-grammars/html.tmLanguage.json')
        ).text(),
      }
    } else {
      return {
        format: 'json',
        content: await (
          await fetch('src/assets/monaco-grammars/markdown.tmLanguage.json')
        ).text(),
      }
    }
  },
})
