import { defaultLocale } from 'src/localization';
import HomePage from './[lang]/index';

export default HomePage;

export async function getStaticProps() {
  const messages = require(`src/localization/${defaultLocale}/`)?.default;

  return {
    props: {
      lang: defaultLocale,
      messages,
    },
  };
}
