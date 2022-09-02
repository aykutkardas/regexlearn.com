import { GetStaticPaths, GetStaticProps } from 'next';
import { useIntl, FormattedMessage } from 'react-intl';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import LessonBox from 'src/components/LessonBox';
import CustomHead from 'src/components/CustomHead';
// import ProductButton from 'src/components/ProductButton';
import HighlightedText from 'src/components/HighlightedText';

import { defaultLocale, locales } from 'src/localization';
import lessons from 'src/data/lessons/index.json';

const PageLearn = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <CustomHead title="page.learn.title" description="page.learn.description" hrefLang="learn">
        <link rel="stylesheet" href="/css/animate.css" />
      </CustomHead>
      <Header />
      <div className="container">
        {/* <ProductButton /> */}
        <div className="row tw-flex tw-items-center">
          <div className="col-xs-12 col-sm-12 col-md-8 tw-flex tw-flex-col tw-items-start">
            <h1 className="tw-text-3xl">
              <FormattedMessage id={'section.learn.title'} />
            </h1>
            <HighlightedText
              element="p"
              className="tw-text-[18px] dark:tw-text-neutral-200 tw-mt-4 tw-leading-8"
              text={formatMessage({ id: 'section.learn.content' })}
              attrs={{ className: 'dark:tw-text-green-400' }}
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 tw-hidden lg:tw-flex">
            <img
              src="/Learn.webp"
              loading="lazy"
              className="w-full"
              alt={formatMessage({ id: 'section.learn.imageAltText' })}
            />
          </div>
        </div>
        <div className="row">
          {lessons.map(lesson => (
            <div key={lesson.key} className="col-xs-12 col-sm-6 col-md-4 tw-mb-5">
              <LessonBox data={lesson} />
              {lesson.sponsor ? (
                <span className="tw-text-xs tw-flex tw-justify-end tw-items-center dark:tw-text-neutral-300 dark:hover:tw-text-neutral-400 tw-cursor-pointer">
                  Sponsored by{' '}
                  <a href={lesson.sponsorURL} target="_blank" rel="noreferrer">
                    <img className="tw-h-3 tw-mx-1" src={lesson.sponsorLogo} alt={lesson.sponsor} />
                  </a>
                </span>
              ) : (
                <a
                  target="_blank"
                  className="tw-text-xs tw-flex tw-justify-end tw-items-center dark:tw-text-neutral-300 dark:hover:tw-text-neutral-400 tw-cursor-pointer"
                  rel="noreferrer"
                  href="https://github.com/aykutkardas/regexlearn.com#sponsoring"
                >
                  Become a Sponsor
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageLearn;

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
