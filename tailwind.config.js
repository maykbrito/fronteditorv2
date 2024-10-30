/**
 * @type { import('tailwindcss/tailwind-config').TailwindConfig }
 */
module.exports = {
    darkMode: ['class'],
    mode: 'jit',
  content: ['./src/*.tsx', './src/components/**/*.tsx'],
  theme: {
  	extend: {
  		gridTemplateColumns: {
  			floatingPreviewHeader: '100px 1fr 100px',
  			previewHeader: '1fr 100px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
