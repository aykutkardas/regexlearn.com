import { GetStaticPaths, GetStaticProps } from 'next';
import { FormattedMessage, useIntl } from 'react-intl';

import { defaultLocale, locales } from 'src/localization';

import Icon from 'src/components/Icon';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Section from 'src/components/Section';
import IntlLink from 'src/components/IntlLink';
import SupportButton from 'src/components/SupportButton';
import HighlightedText from 'src/components/HighlightedText';
import Button, { ButtonVariants } from 'src/components/Button';
import ProductHuntBadges from 'src/components/ProductHuntBadges';

import sponsors from 'sponsors.json';
import globalIntl from 'src/utils/globalIntl';
import { useLanguageDirection } from 'src/utils/useLanguageDirection';

const HeroVisual = ({ alt }: { alt: string }) => (
  <div className="relative">
    <div aria-hidden className="absolute inset-[10%] rounded-full bg-regreen-400/20 blur-[80px]" />
    <img
      className="relative w-80 h-80 lg:w-[480px] lg:h-[480px] drop-shadow-2xl"
      src="/Done.webp"
      alt={alt}
    />
    <div
      aria-hidden
      dir="ltr"
      className="absolute top-10 ltr:-left-4 rtl:-right-4 hidden lg:flex items-center gap-2 surface backdrop-blur-md rounded-xl px-3 py-2 font-mono text-xs animate-float"
    >
      <span className="text-neutral-500">/</span>
      <span className="text-regreen-400">[a-z]+</span>
      <span className="text-neutral-500">/g</span>
    </div>
    <div
      aria-hidden
      dir="ltr"
      className="absolute bottom-16 ltr:-right-2 rtl:-left-2 hidden lg:flex items-center gap-1.5 surface backdrop-blur-md rounded-xl px-3 py-2 font-mono text-xs animate-float [animation-delay:-3s]"
    >
      <span className="px-1 rounded bg-regreen-400 text-ink-950">regex</span>
      <span className="text-neutral-400">is</span>
      <span className="px-1 rounded bg-regreen-400 text-ink-950">fun</span>
    </div>
  </div>
);

const PageHome = () => {
  const { formatMessage } = useIntl();
  const direction = useLanguageDirection();

  return (
    <div className="container">
      <Header />
      <div className="w-full flex flex-col md:flex-row items-center gap-10 md:min-h-[calc(100vh-5rem)] pt-10 pb-16 md:py-12">
        <div className="w-full md:w-3/5 text-center md:text-start animate-fade-up">
          <span dir="ltr" className="eyebrow font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-regreen-400 animate-pulse" />
            /^learn(ing)?\s+regex$/i
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-300">
            <FormattedMessage id="landing.title" />
          </h1>
          <HighlightedText
            element="p"
            className="md:text-lg leading-relaxed text-neutral-400 max-w-xl mx-auto md:mx-0"
            text={formatMessage({ id: 'landing.description' })}
            attrs={{ className: 'code-chip' }}
          />
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-8">
            <IntlLink href="/[lang]/learn" tabIndex={-1}>
              <Button variant={ButtonVariants.Primary} className="px-6 py-3 text-[15px]">
                <FormattedMessage id="general.startLearning" />
                <Icon icon={direction === 'rtl' ? 'arrow-left' : 'arrow-right'} size={16} />
              </Button>
            </IntlLink>
            <IntlLink href="/[lang]/playground" tabIndex={-1}>
              <Button variant={ButtonVariants.Secondary} className="px-6 py-3 text-[15px]">
                <FormattedMessage id="general.playground" />
              </Button>
            </IntlLink>
          </div>
          <div className="mt-10 flex justify-center md:justify-start opacity-80">
            <ProductHuntBadges />
          </div>
        </div>
        <div className="w-full md:w-2/5 hidden sm:flex justify-center md:justify-end">
          <HeroVisual alt={formatMessage({ id: 'landing.imageAltText' })} />
        </div>
      </div>

      <div className="border-t border-white/[0.06]" />

      <Section
        index={1}
        title="section.learn.title"
        description="section.learn.content"
        image="/Learn.webp"
        imageAltText="section.learn.imageAltText"
        link="/[lang]/learn"
        buttonText="general.startLearning"
        reverse
      />
      <Section
        index={2}
        title="section.cheatsheet.title"
        description="section.cheatsheet.content"
        image="/Cheatsheet.webp"
        imageAltText="section.cheatsheet.imageAltText"
        link="/[lang]/cheatsheet"
        buttonText="section.cheatsheet.button"
      />
      <Section
        index={3}
        title="section.playground.title"
        description="section.playground.content"
        image="/Playground.webp"
        link="/[lang]/playground"
        buttonText="section.cheatsheet.button"
        imageAltText="section.playground.imageAltText"
        reverse
      />
      <Section
        index={4}
        title="section.practice.title"
        description="section.practice.content"
        image="/Practise.webp"
        imageAltText="section.practice.imageAltText"
      />
      <Section
        index={5}
        title="section.opensource.title"
        description="section.opensource.content"
        image="/Open Source.webp"
        imageAltText="section.opensource.imageAltText"
        link="https://github.com/aykutkardas/regexlearn.com"
        reverse
        customButton={() => (
          <a
            href="https://github.com/aykutkardas/regexlearn.com"
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
          >
            <Button variant={ButtonVariants.Secondary} className="mt-6">
              <Icon icon="github" size={16} />
              <span>GitHub</span>
            </Button>
          </a>
        )}
      />
      <section className="w-full mt-16 mb-8">
        <div className="surface rounded-3xl px-6 py-10 text-center">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            <FormattedMessage id="general.ourSponsors" />
          </h3>
          <div className="flex flex-wrap gap-8 mt-6 items-center justify-center">
            {sponsors.map(sponsor => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                <img
                  src={sponsor.logo.url}
                  width={sponsor.logo.width}
                  height={sponsor.logo.height}
                  alt={sponsor.name}
                  title={sponsor.name}
                />
              </a>
            ))}
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/aykutkardas/regexlearn.com#sponsoring"
            className="inline-block mt-8 text-sm text-regreen-400 hover:text-regreen-300 transition-colors"
          >
            <FormattedMessage id="general.becomeSponsor" /> &rarr;
          </a>
        </div>
      </section>
      <SupportButton />
      <Footer />
    </div>
  );
};

export default PageHome;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;
  const intl = globalIntl(lang, messages);

  return {
    props: {
      lang,
      messages,
      metadata: {
        title: intl.formatMessage({ id: 'page.landing.title' }),
        description: intl.formatMessage({ id: 'page.landing.description' }),
        hrefLang: '',
      },
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
