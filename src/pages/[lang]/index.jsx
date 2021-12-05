import dynamic from 'next/dynamic';
import { FormattedMessage, useIntl } from 'react-intl';
import Head from 'next/head';
import cx from 'classnames';

import tagWrapper from 'src/utils/tagWrapper';
import { defaultLocale, locales } from 'src/localization';

const ProductButton = dynamic(import('src/components/ProductButton'), { ssr: true });
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Section from 'src/components/Section';

import * as styles from './Home.module.css';
import IntlLink from 'src/components/IntlLink';

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
              <IntlLink href="/learn" passHref>
                <a className={styles.LandingMainSectionButton}>
                  <Button variant="primary">
                    <FormattedMessage id="general.startLearning" />
                  </Button>
                </a>
              </IntlLink>
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
        <div className={cx('row', styles.OurSponsors)}>
          <h3 className={styles.OurSponsorsTitle}>
            <FormattedMessage id="general.ourSponsors" />
          </h3>
          <a
            href="https://sitechecker.pro/?utm_source=regexlearn&utm_medium=referral&utm_campaign=sponsorship"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/sitechecker.pro.webp" alt="" />
          </a>
          <a
            href="https://seo.do/?utm_source=regexlearn&utm_medium=referral&utm_campaign=sponsorship"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/seo.do.webp" alt="" />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  return {
    props: {
      lang: params.lang,
    },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: locales
      .filter(locale => locale !== defaultLocale)
      .map(lang => ({
        params: {
          lang,
        },
      })),
  };
}
