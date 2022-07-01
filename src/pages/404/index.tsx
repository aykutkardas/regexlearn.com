import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FormattedMessage, useIntl } from 'react-intl';

import Button, { ButtonVariants } from 'src/components/Button';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import IntlLink from 'src/components/IntlLink';
import { defaultLocale } from 'src/localization';

import styles from './404.module.css';

const Page404 = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Head>
        <title>{formatMessage({ id: 'page.404.title' })}</title>
      </Head>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={styles.NotFound}>
              <img className={styles.NotFoundImage} src="/404.webp" alt="404" />
              <IntlLink href="/" passHref>
                <Button variant={ButtonVariants.Primary}>
                  <FormattedMessage id="notFound.button" />
                </Button>
              </IntlLink>
              <p>
                <FormattedMessage
                  id="notFound.intro"
                  values={{
                    br: <br />,
                  }}
                />
              </p>
            </div>
          </div>
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
