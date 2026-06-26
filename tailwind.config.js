/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F4621F',
          'orange-dark': '#C94D10',
          night: '#0F1117',
          'night-soft': '#1A1E2A',
          slate: '#2C3347',
        },
      },
    },
  },
  plugins: [],
}
