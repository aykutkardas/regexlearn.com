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
        primary: '#328554',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  prefix: 'tw-',
};
