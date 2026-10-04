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
        sans: ["'Inter'", "'Open Sans'", ...defaultTheme.fontFamily.sans],
        mono: ["'JetBrains Mono'", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        regreen: {
          300: '#9bf9c1',
          400: '#5ff59b',
          500: '#328554',
          600: '#29593c',
        },
        jet: {
          400: '#333333',
          500: '#272727',
        },
        // Surfaces derived from the original #282c34 background.
        ink: {
          950: '#1b1e23',
          900: '#21252b',
          800: '#282c34',
          700: '#2f343d',
          600: '#383e49',
          500: '#4a515e',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(95 245 155 / 0.25), 0 8px 30px -6px rgb(95 245 155 / 0.35)',
        'glow-sm': '0 0 0 1px rgb(95 245 155 / 0.2), 0 4px 16px -4px rgb(95 245 155 / 0.3)',
        card: '0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 12px 32px -12px rgb(0 0 0 / 0.5)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
