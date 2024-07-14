/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '490px',
      md: '768px',
      lg: '1000px',
      xl: '1280px',
      '2xl': '1450px',
      '3xl': '1770px',
      '4xl': '1920px'
    },
    colors: {
      gray: '#c8c8c8',
      black: '#000000',
      navy: '#000621',
      white: '#ffffff',
      green: '#16c411'
    },
    extend: {},

    fontFamily: {
      sans: ['PT Sans', 'sans-serif']
    }
  },
  plugins: []
};
