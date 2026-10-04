import { GetStaticProps } from 'next';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonVariants } from 'src/components/Button';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import IntlLink from 'src/components/IntlLink';
import { defaultLocale } from 'src/localization';
import globalIntl from 'src/utils/globalIntl';

const Page404 = () => (
  <div className="container flex flex-col h-full">
    <Header />
    <div className="flex flex-col flex-1 items-center justify-center w-full h-full text-center py-12">
      <div className="relative">
        <div aria-hidden className="absolute inset-[15%] rounded-full bg-regreen-400/10 blur-3xl" />
        <img className="relative w-[300px]" src="/404.webp" alt="404" />
      </div>
      <p className="mt-4 text-neutral-400 leading-relaxed">
        <FormattedMessage
          id="notFound.intro"
          values={{
            br: <br />,
          }}
        />
      </p>
      <IntlLink href="/" tabIndex={-1}>
        <Button variant={ButtonVariants.Primary} className="mt-6">
          <FormattedMessage id="notFound.button" />
        </Button>
      </IntlLink>
    </div>
    <Footer />
  </div>
);

export default Page404;

export const getStaticProps: GetStaticProps = async () => {
  const messages = require(`src/localization/${defaultLocale}/`)?.default;
  const intl = globalIntl('en', messages);

  return {
    props: {
      lang: defaultLocale,
      messages,
      metadata: {
        title: intl.formatMessage({ id: 'page.404.title' }),
      },
    },
  };
};
