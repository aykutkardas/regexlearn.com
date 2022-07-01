import { GetStaticPaths, GetStaticProps } from 'next';
import { FormattedMessage, useIntl } from 'react-intl';
import cx from 'classnames';

import { defaultLocale, locales } from 'src/localization';

import ProductButton from 'src/components/ProductButton';
import Button, { ButtonVariants } from 'src/components/Button';
import Icon from 'src/components/Icon';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Section from 'src/components/Section';
import IntlLink from 'src/components/IntlLink';
import CustomHead from 'src/components/CustomHead';

import styles from './Home.module.css';

import sponsors from 'sponsors.json';
import HighlightedText from 'src/components/HighlightedText';

const PageHome = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <CustomHead title="page.landing.title" description="page.landing.description" hrefLang="" />
      <Header />
      <div className="container">
        <div className={cx('row', styles.LandingMainSection)}>
          <div className="col-xs-12 col-sm-12 col-md-6">
            <div className="landing">
              <h1 className={styles.LandingMainSectionTitle}>
                <FormattedMessage id="landing.title" />
              </h1>
              <HighlightedText
                element="p"
                className={styles.LandingMainSectionDescription}
                text={formatMessage({ id: 'landing.description' })}
                attrs={{ className: styles.LandingMainSectionDescriptionHighlight }}
              />
              <IntlLink href="/[lang]/learn" passHref>
                <a className={styles.LandingMainSectionButton}>
                  <Button variant={ButtonVariants.Primary}>
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
          link="/[lang]/playground"
          buttonText="general.start"
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
              <Button variant={ButtonVariants.Github} className={className}>
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
          {sponsors.map(sponsor => (
            <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noreferrer">
              <img src={sponsor.logo} alt={sponsor.name} title={sponsor.name} />
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageHome;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;

  return {
    props: {
      lang,
      messages,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: locales.map(lang => ({
      params: {
        lang,
      },
    })),
  };
};
