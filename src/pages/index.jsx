import dynamic from 'next/dynamic';
import { FormattedMessage, useIntl } from 'react-intl';
import Head from 'next/head';
import Link from 'next/link';
import cx from 'classnames';

import tagWrapper from '../utils/tagWrapper';

const ProductButton = dynamic(import('../components/ProductButton'), { ssr: true });
import Button from '../components/Button';
import Icon from '../components/Icon';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Section from '../components/Section';

import * as styles from './Home.module.css';

export default function Home() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Header />
      <Head>
        <title>{formatMessage({ id: 'page.landing.title' })}</title>
        <link rel="canonical" href="https://regexlearn.com" />
        <meta name="description" content={formatMessage({ id: 'page.landing.description' })} />
      </Head>
      <div className="container">
        <div className={cx('row', styles.LandingMainSection)}>
          <div className="col-xs-12 col-sm-12 col-md-6">
            <div className="landing">
              <h1 className={styles.LandingMainSectionTitle}>
                <FormattedMessage id="landing.title" />
              </h1>
              <p
                className={styles.LandingMainSectionDescription}
                dangerouslySetInnerHTML={{
                  __html: tagWrapper(
                    formatMessage({ id: 'landing.description' }),
                    /`(\S*?[^`]*)`/gim,
                    styles.LandingMainSectionDescriptionHighlight,
                  ),
                }}
              />
              <Link href="/learn" passHref>
                <a className={styles.LandingMainSectionButton}>
                  <Button variant="primary">
                    <FormattedMessage id="general.startLearning" />
                  </Button>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 visible-md visible-lg intro">
            <img src="/Done.webp" width="100%" alt="a relaxed man with his legs on the table" />
            <ProductButton className={styles.ProductHuntButton} />
          </div>
        </div>

        <Section
          title="section.learn.title"
          description="section.learn.content"
          image="/Learn.webp"
          link="/learn"
          buttonText="general.startLearning"
        />
        <Section
          reverse
          title="section.cheatsheet.title"
          description="section.cheatsheet.content"
          image="/Cheatsheet.webp"
          link="/cheatsheet"
          buttonText="section.cheatsheet.button"
        />
        <Section
          title="section.playground.title"
          description="section.playground.content"
          image="/Playground.webp"
        />
        <Section
          reverse
          title="section.practice.title"
          description="section.practice.content"
          image="/Practise.webp"
        />
        <Section
          title="section.opensource.title"
          description="section.opensource.content"
          image="/Open Source.webp"
          link="https://github.com/aykutkardas/regexlearn.com"
          customButton={({ className }) => (
            <a
              href="https://github.com/aykutkardas/regexlearn.com"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="github" className={className}>
                <Icon icon="github" size={16} color="white" />
                <span>GitHub</span>
              </Button>
            </a>
          )}
        />
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
