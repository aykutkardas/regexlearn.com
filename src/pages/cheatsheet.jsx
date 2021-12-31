import { defaultLocale } from 'src/localization';
import CheatsheetPage from './[lang]/cheatsheet';

export default CheatsheetPage;

export async function getStaticProps() {
  const messages = require(`src/localization/${defaultLocale}/`)?.default;

  return {
    props: {
      lang: defaultLocale,
      messages,
    },
  };
}
