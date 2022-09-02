const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ["'Open Sans'", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      ...colors,
      primary: '#328554',
    },
    extend: {},
  },
  plugins: [],
  prefix: 'tw-',
};
