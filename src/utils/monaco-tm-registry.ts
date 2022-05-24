import { Registry } from 'monaco-textmate'

import jsGrammar from '../assets/monaco-grammars/JavaScript.tmLanguage.json?url'
import cssGrammar from '../assets/monaco-grammars/css.tmLanguage.json?url'
import htmlGrammar from '../assets/monaco-grammars/html.tmLanguage.json?url'
import mdGrammar from '../assets/monaco-grammars/markdown.tmLanguage.json?url'

export const registry = new Registry({
  getGrammarDefinition: async (scopeName) => {
    if (scopeName === 'source.js') {
      return {
        format: 'json',
        content: await (await fetch(jsGrammar)).text(),
      }
    } else if (scopeName === 'source.css') {
      return {
        format: 'json',
        content: await (await fetch(cssGrammar)).text(),
      }
    } else if (scopeName === 'source.html') {
      return {
        format: 'json',
        content: await (await fetch(htmlGrammar)).text(),
      }
    } else if (scopeName === 'source.md') {
      return {
        format: 'json',
        content: await (await fetch(mdGrammar)).text(),
      }
    } else {
      return {
        format: 'json',
        content: '{}',
      }
    }
  },
})
