/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./public/**/*.{html,js}",
    "./modules/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0066cc',
        'purple-start': '#667eea',
        'purple-end': '#764ba2',
        'dark-bg': '#2d3748',
        'success': '#48bb78',
        'alert': '#ff6b6b',
        'card-dark': '#1a202c',
        'border-dark': '#4a5568'
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }
    },
  },
  plugins: [],
}
