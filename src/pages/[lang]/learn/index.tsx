import { GetStaticPaths, GetStaticProps } from 'next';
import { useIntl, FormattedMessage } from 'react-intl';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import LessonBox from 'src/components/LessonBox';
import CustomHead from 'src/components/CustomHead';
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
      <div className="container h-full">
        <div className="flex items-center mt-6">
          <div className="w-full md:w-2/3 flex flex-col items-start">
            <h1 className="text-3xl text-white">
              <FormattedMessage id={'section.learn.title'} />
            </h1>
            <HighlightedText
              element="p"
              className=" text-neutral-300 mt-4 "
              text={formatMessage({ id: 'section.learn.content' })}
              attrs={{ className: 'text-green-400' }}
            />
          </div>
          <div className="w-1/3 hidden md:flex">
            <img
              src="/Learn.webp"
              loading="lazy"
              className="w-full drop-shadow-xl"
              alt={formatMessage({ id: 'section.learn.imageAltText' })}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {lessons.map(lesson => (
            <div key={lesson.key} className="w-full sm:w-1/2 md:w-1/3 mb-5">
              <LessonBox data={lesson} />
              {lesson.sponsor ? (
                <span className="text-xs mt-1 flex justify-end items-center text-neutral-300 hover:text-neutral-400 cursor-pointer">
                  Sponsored by{' '}
                  <a href={lesson.sponsorURL} target="_blank" rel="noreferrer">
                    <img className="h-3 mx-1" src={lesson.sponsorLogo} alt={lesson.sponsor} />
                  </a>
                </span>
              ) : (
                <a
                  target="_blank"
                  className="text-xs mt-1 flex justify-end items-center text-neutral-300 hover:text-neutral-400 cursor-pointer"
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
