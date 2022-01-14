import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';
import cx from 'classnames';

import tagWrapper from 'src/utils/tagWrapper';
import { defaultLocale, locales } from 'src/localization';

import ProductButton from 'src/components/ProductButton';
import SeoTags from 'src/components/SeoTags';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Section from 'src/components/Section';

import * as styles from './Home.module.css';
import IntlLink from 'src/components/IntlLink';

export default function Home() {
  const { formatMessage } = useIntl();
  const { asPath } = useRouter();

  const pageTitle = formatMessage({ id: 'page.landing.title' });
  const pageDescription = formatMessage({ id: 'page.landing.description' });

  return (
    <>
      <Header />
      <Head>
        <link rel="stylesheet" href="/css/animate.css" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <SeoTags title={pageTitle} description={pageDescription} href={asPath} />
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
              <IntlLink href="/[lang]/learn" passHref>
                <a className={styles.LandingMainSectionButton}>
                  <Button variant="primary">
                    <FormattedMessage id="general.startLearning" />
                  </Button>
                </a>
              </IntlLink>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 visible-md visible-lg intro">
            <img
              loading="lazy"
              src="/Done.webp"
              width="100%"
              alt={formatMessage({ id: 'landing.imageAltText' })}
            />
          </div>
          <ProductButton />
        </div>

        <Section
          title="section.learn.title"
          description="section.learn.content"
          image="/Learn.webp"
          imageAltText="section.learn.imageAltText"
          link="/[lang]/learn"
          buttonText="general.startLearning"
        />
        <Section
          reverse
          title="section.cheatsheet.title"
          description="section.cheatsheet.content"
          image="/Cheatsheet.webp"
          imageAltText="section.cheatsheet.imageAltText"
          link="/[lang]/cheatsheet"
          buttonText="section.cheatsheet.button"
        />
        <Section
          title="section.playground.title"
          description="section.playground.content"
          image="/Playground.webp"
          imageAltText="section.playground.imageAltText"
        />
        <Section
          reverse
          title="section.practice.title"
          description="section.practice.content"
          image="/Practise.webp"
          imageAltText="section.practice.imageAltText"
        />
        <Section
          title="section.opensource.title"
          description="section.opensource.content"
          image="/Open Source.webp"
          imageAltText="section.opensource.imageAltText"
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
            <img src="/sitechecker.pro.webp" alt="sitechecker.pro" />
          </a>
          <a
            href="https://seo.do/?utm_source=regexlearn&utm_medium=referral&utm_campaign=sponsorship"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/seo.do.webp" alt="seo.do" />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;

  return {
    props: {
      lang,
      messages,
    },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: locales.map(lang => ({
      params: {
        lang,
      },
    })),
  };
}
