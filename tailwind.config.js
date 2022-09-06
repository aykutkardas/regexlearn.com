const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        screens: {
          xl: '1170px',
        },
        padding: '1rem',
        center: true,
      },
      fontFamily: {
        sans: ["'Open Sans'", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        regreen: {
          400: '#5ff59b',
          500: '#328554',
          600: '#29593c',
        },
        jet: {
          400: '#333333',
          500: '#272727',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
