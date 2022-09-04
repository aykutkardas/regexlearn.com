import { GetStaticPaths, GetStaticProps } from 'next';
import { FormattedMessage, useIntl } from 'react-intl';
import cx from 'classnames';

import { defaultLocale, locales } from 'src/localization';

import Icon from 'src/components/Icon';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Section from 'src/components/Section';
import IntlLink from 'src/components/IntlLink';
import CustomHead from 'src/components/CustomHead';
import HighlightedText from 'src/components/HighlightedText';
import Button, { ButtonVariants } from 'src/components/Button';

import sponsors from 'sponsors.json';
import ProductHuntBadges from 'src/components/ProductHuntBadges';

const PageHome = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <CustomHead title="page.landing.title" description="page.landing.description" hrefLang="" />
      <Header />
      <div className="container">
        <div className="w-full flex items-center min-h-screen relative -top-12">
          <div className="w-full md:w-7/10">
            <h1 className="text-3xl font-bold sm:leading-snug mb-3 font-sans lg:text-[45px] dark:text-white">
              <FormattedMessage id="landing.title" />
            </h1>
            <HighlightedText
              element="p"
              className="md:text-lg md:leading-8 my-1 mb-5 dark:text-neutral-200"
              text={formatMessage({ id: 'landing.description' })}
              attrs={{ className: 'underline underline-offset-2 decoration-green-300' }}
            />
            <div className="">
              <ProductHuntBadges />
            </div>

            <IntlLink href="/[lang]/learn" passHref>
              <a>
                <Button variant={ButtonVariants.Primary} className="mt-4">
                  <FormattedMessage id="general.startLearning" />
                </Button>
              </a>
            </IntlLink>
          </div>
          <div className="w-full md:w-3/10 hidden sm:flex">
            <img
              loading="lazy"
              className="w-full"
              src="/Done.webp"
              alt={formatMessage({ id: 'landing.imageAltText' })}
            />
          </div>
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
              <Button className="inline-flex items-center justify-center dark:bg-neutral-600 dark:hover:bg-neutral-700 mt-4">
                <Icon icon="github" size={16} color="white" className="mr-2" />
                <span>GitHub</span>
              </Button>
            </a>
          )}
        />
        <div className="w-full text-center mb-16 my-52">
          <h3 className="dark:text-neutral-300 text-md">
            <FormattedMessage id="general.ourSponsors" />
          </h3>
          <div className="flex gap-3 mt-2 items-center justify-center">
            {sponsors.map(sponsor => (
              <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noreferrer">
                <img src={sponsor.logo} alt={sponsor.name} title={sponsor.name} />
              </a>
            ))}
          </div>
        </div>
        <Footer />
      </div>
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
