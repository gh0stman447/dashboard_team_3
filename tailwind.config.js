/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '490px',
      md: '600px',
      'md-lg': '880px',
      lg: '1080px',
      xl: '1280px',
      '2xl': '1500px',
      '3xl': '1770px',
      '4xl': '1920px'
    },

    extend: {
      gridTemplateColumns: {
        20: 'repeat(20, minmax(0, 1fr))',
        24: 'repeat(24, minmax(0, 1fr))'
      },
      colors: {
        gray: '#c8c8c8',
        black: '#000000',
        navy: '#000621',
        white: '#ffffff',
        green: '#16c411',
        pink: '#e5dfdf',
        'sky-blue': '#eff1ff',
        red: '#ff4000'
      }
    },

    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif']
    }
  },
  plugins: []
};
