/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark cyberpunk theme from SEO Agent
        'dark-bg': '#0d0b1a',
        'dark-surface': '#16123a',
        'dark-card': '#1e1749',
        'dark-border': '#2d2476',
        'primary': '#7c3aed',
        'primary-hover': '#8b5cf6',
        'primary-light': '#a855f7',
        'accent-blue': '#6366f1',
        'success': '#00ff88',
        'warning': '#ffaa00',
        'error': '#ff4444',
        'info': '#0088ff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-cyberpunk': 'linear-gradient(135deg, #0d0b1a 0%, #16123a 50%, #1e1749 100%)',
        'gradient-neural': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.5)',
        'glow-blue': '0 0 20px rgba(99, 102, 241, 0.5)',
      },
    },
  },
  plugins: [],
}