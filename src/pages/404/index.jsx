import Head from 'next/head';
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';

import * as styles from './404.module.css';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Header />
      <Head>
        <title>{formatMessage({ id: 'page.404.title' })}</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={styles.NotFound}>
              <img className={styles.NotFoundImage} src="/404.webp" alt="404" />
              <Link href="/" passHref>
                <Button variant="primary">
                  <FormattedMessage id="notFound.button" />
                </Button>
              </Link>
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
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
