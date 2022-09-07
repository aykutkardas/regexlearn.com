import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FormattedMessage, useIntl } from 'react-intl';

import Button, { ButtonVariants } from 'src/components/Button';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import IntlLink from 'src/components/IntlLink';
import { defaultLocale } from 'src/localization';

const Page404 = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Head>
        <title>{formatMessage({ id: 'page.404.title' })}</title>
      </Head>
      <div className="container flex flex-col h-full">
        <Header />
        <div className="flex flex-col flex-1 items-center justify-center w-full h-full">
          <img className="w-[300px]" src="/404.webp" alt="404" />
          <IntlLink href="/" passHref>
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
    </>
  );
};

export default Page404;

export const getStaticProps: GetStaticProps = async () => {
  const messages = require(`src/localization/${defaultLocale}/`)?.default;

  return {
    props: {
      lang: defaultLocale,
      messages,
    },
  };
};
