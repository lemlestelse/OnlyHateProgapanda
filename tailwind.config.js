/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blood-red': '#FF0000',
        'dark-red': '#8B0000',
        'darker-red': '#4D0000',
        'blackmetal': {
          900: '#000000',
          800: '#0A0A0A',
          700: '#141414',
          600: '#1E1E1E',
          500: '#282828',
          400: '#323232',
        },
        'grimdark': {
          100: '#FFFFFF',
          200: '#E6E6E6',
          300: '#CCCCCC',
          400: '#B3B3B3',
          500: '#999999',
        }
      },
      fontFamily: {
        'metal': ['Cinzel Decorative', 'serif'],
        'body': ['Quicksand', 'sans-serif']
      }
    },
  },
  plugins: [],
};