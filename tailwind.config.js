/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b1220',
        card: 'rgba(18,23,34,0.55)',
        stroke: 'rgba(255,255,255,0.08)',
        textPrimary: '#e6eefc',
        textSecondary: 'rgba(230,238,252,0.72)',
        brand: '#5b8cff',
        positive: '#34d399',
        warning: '#f59e0b',
      },
      borderRadius: {
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'pill': '999px',
      },
      spacing: {
        'xs': '6px',
        'sm': '10px',
        'md': '14px',
        'lg': '18px',
        'xl': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'fade-out': 'fadeOut 160ms ease-in',
        'scale-in': 'scaleIn 140ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}






