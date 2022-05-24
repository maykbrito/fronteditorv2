/**
 * @type { import('tailwindcss/tailwind-config').TailwindConfig }
 */
module.exports = {
  mode: 'jit',
  content: ['./src/*.tsx', './src/components/**/*.tsx'],
  theme: {
    extend: {
      gridTemplateColumns: {
        floatingPreviewHeader: '100px 1fr 100px',
        previewHeader: '1fr 100px',
      },
    },
  },
  plugins: [],
}
