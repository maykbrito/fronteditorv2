import { editor } from 'monaco-editor';

const colors = {
  dark: '#191622',
  bright: '#E1E1E6',
  pink: '#FF79C6',
  green: '#67e480',
  gray: '#9999aa',
  purple: '#988bc7',
  yellow: '#e7de79',
};

export const omniTheme: editor.IStandaloneThemeData = {
  inherit: true,
  base: 'vs-dark',
  colors: {
    'editor.foreground': colors.bright,
    'editor.background': colors.dark,
  },
  rules: [
    { token: 'delimiter.js', foreground: colors.pink },
    { token: 'keyword', foreground: colors.pink },
    { token: 'tag', foreground: colors.pink },
    { token: 'type.identifier.js', foreground: colors.green },
    { token: 'attribute.value.css', foreground: colors.green },
    { token: 'property.js', foreground: colors.gray },
    { token: 'delimiter.parenthesis.js', foreground: colors.gray },
    { token: 'metatag.html', foreground: colors.purple },
    { token: 'metatag.xml', foreground: colors.purple },
    { token: 'attribute.value.html', foreground: colors.yellow },
    { token: 'string.css', foreground: colors.yellow },
    { token: 'string.js', foreground: colors.yellow },
  ],
};
