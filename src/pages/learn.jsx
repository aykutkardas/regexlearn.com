import { defaultLocale } from 'src/localization';
import LearnPage from './[lang]/learn';

export default LearnPage;

export async function getStaticProps() {
  const messages = require(`src/localization/${defaultLocale}/`)?.default;

  return {
    props: {
      lang: defaultLocale,
      messages,
    },
  };
}
