import { editor } from 'monaco-editor';

export const omniTheme: editor.IStandaloneThemeData = {
  inherit: true,
  base: 'vs-dark',
  colors: {
    'editor.foreground': '#E1E1E6', // bright
    'editor.background': '#191622', // dark
  },
  rules: [
    // pink
    { token: 'delimiter.js', foreground: '#FF79C6' },
    { token: 'keyword', foreground: '#FF79C6' },
    { token: 'tag', foreground: '#FF79C6' },
    // green
    { token: 'type.identifier.js', foreground: '#67e480' },
    { token: 'attribute.value.css', foreground: '#67e480' },
    // gray
    { token: 'property.js', foreground: '#9999aa' },
    { token: 'delimiter.parenthesis.js', foreground: '#9999aa' },
    // purple
    { token: 'metatag.html', foreground: '#988bc7' },
    { token: 'metatag.xml', foreground: '#988bc7' },
    // yellow
    { token: 'attribute.value.html', foreground: '#e7de79' },
    { token: 'string.css', foreground: '#e7de79' },
    { token: 'string.js', foreground: '#e7de79' },
  ],
};
