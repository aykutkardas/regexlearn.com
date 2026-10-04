import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextCoreWebVitals,
  {
    rules: {
      '@next/next/next-script-for-ga': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-css-tags': 'off',
      'react/self-closing-comp': 'error',
      // New React Compiler-oriented rules in eslint-plugin-react-hooks 7. They flag existing,
      // working patterns (e.g. reading localStorage into state after mount); kept visible as
      // warnings until those spots are refactored.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
    },
  },
];

export default config;
