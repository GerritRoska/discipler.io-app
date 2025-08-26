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
      }
    },
  },
  plugins: [],
}






