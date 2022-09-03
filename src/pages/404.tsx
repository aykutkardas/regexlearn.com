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
      <Header />
      <div className="tw-container tw-h-full">
        <div className="tw-flex tw-flex-col tw-flex-1 tw-items-center tw-justify-center tw-w-full tw-h-full">
          <img className="tw-w-[300px]" src="/404.webp" alt="404" />
          <IntlLink href="/" passHref>
            <Button variant={ButtonVariants.Primary}>
              <FormattedMessage id="notFound.button" />
            </Button>
          </IntlLink>
          <p className="tw-mt-3">
            <FormattedMessage
              id="notFound.intro"
              values={{
                br: <br />,
              }}
            />
          </p>
        </div>
      </div>
      <Footer />
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
