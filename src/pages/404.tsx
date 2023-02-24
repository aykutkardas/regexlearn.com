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
    <div className="flex flex-col flex-1 items-center justify-center w-full h-full">
      <img className="w-[300px]" src="/404.webp" alt="404" />
      <IntlLink href="/">
        <Button variant={ButtonVariants.Primary}>
          <FormattedMessage id="notFound.button" />
        </Button>
      </IntlLink>
      <p className="mt-3">
        <FormattedMessage
          id="notFound.intro"
          values={{
            br: <br />,
          }}
        />
      </p>
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
