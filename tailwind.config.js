/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dashboard/index.html",
    "./dashboard/**/*.{html,js}",
    "./index.html",
    "./public/**/*.{html,js}",
    "./modules/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors - Blue & Gold Theme (WCAG AA Compliant)
        'primary': '#2563eb',        // royal blue - 4.5:1 on dark
        'primary-hover': '#1d4ed8',  // darker blue
        'primary-active': '#1e40af', // deep blue
        'gold': '#f59e0b',           // gold/amber
        'gold-hover': '#d97706',     // darker gold
        'gold-light': '#fbbf24',     // lighter gold

        // Status Colors
        'success': '#10b981',        // green-500 - better contrast
        'success-hover': '#059669',  // green-600
        'alert': '#ef4444',          // red-500 - better contrast
        'alert-hover': '#dc2626',    // red-600
        'warning': '#f59e0b',        // amber-500

        // Blue & Gold Gradient
        'gradient-start': '#2563eb', // royal blue
        'gradient-end': '#f59e0b',   // gold

        // Dark Theme (Higher Contrast)
        'dark-bg': '#0a0e1a',        // deep navy
        'card-dark': '#1e293b',      // slate-800
        'border-dark': '#334155',    // slate-700

        // Text Colors (WCAG AAA)
        'text-primary': '#f1f5f9',   // slate-100 - 15.2:1 on dark-bg
        'text-secondary': '#cbd5e1',  // slate-300 - 10.8:1
        'text-tertiary': '#94a3b8',  // slate-400 - 7.2:1
        'text-muted': '#64748b',     // slate-500 - 4.6:1 (minimum AA)
      },
      backgroundImage: {
        'blue-gold-gradient': 'linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)',
        'purple-gradient': 'linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)', // alias for compatibility
      },
      fontSize: {
        // Improved font size system (minimum 14px for body text)
        'xs': ['0.75rem', { lineHeight: '1rem' }],        // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],       // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],   // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],     // 36px
        '5xl': ['3rem', { lineHeight: '1' }],             // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],          // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],           // 72px
        '8xl': ['6rem', { lineHeight: '1' }],             // 96px
      },
      spacing: {
        // Consistent 8px grid system
        '4.5': '1.125rem',   // 18px
        '5.5': '1.375rem',   // 22px
        '13': '3.25rem',     // 52px
        '15': '3.75rem',     // 60px
        '18': '4.5rem',      // 72px
        '22': '5.5rem',      // 88px
        '26': '6.5rem',      // 104px
        '30': '7.5rem',      // 120px
      },
      minHeight: {
        'touch': '2.75rem',  // 44px - minimum touch target
      },
      minWidth: {
        'touch': '2.75rem',  // 44px - minimum touch target
      },
      boxShadow: {
        'focus': '0 0 0 3px rgba(59, 130, 246, 0.5)', // blue-500 at 50%
        'focus-primary': '0 0 0 3px rgba(59, 130, 246, 0.5)',
        'focus-success': '0 0 0 3px rgba(16, 185, 129, 0.5)',
        'focus-alert': '0 0 0 3px rgba(239, 68, 68, 0.5)',
      },
    },
  },
  plugins: [],
}
