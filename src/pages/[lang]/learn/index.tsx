import { GetStaticPaths, GetStaticProps } from 'next';
import { useIntl, FormattedMessage } from 'react-intl';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import LessonBox from 'src/components/LessonBox';
import CustomHead from 'src/components/CustomHead';
import SupportButton from 'src/components/SupportButton';
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
      <div className="container flex flex-1 flex-col items-between h-full">
        <Header />
        <div className="flex flex-col justify-center flex-1">
          <div className="flex items-center mt-6">
            <div className="w-full md:w-2/3 flex flex-col items-start">
              <h1 className="text-3xl text-white">
                <FormattedMessage id={'section.learn.title'} />
              </h1>
              <HighlightedText
                element="p"
                className=" text-neutral-300 mt-4 "
                text={formatMessage({ id: 'section.learn.content' })}
                attrs={{ className: 'text-regreen-400' }}
              />
            </div>
            <div className="w-1/3 hidden md:flex">
              <img
                src="/Learn.webp"
                loading="lazy"
                className="w-full pl-8 drop-shadow-xl"
                alt={formatMessage({ id: 'section.learn.imageAltText' })}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {lessons.map(lesson => (
              <div key={lesson.key} className="w-full sm:w-1/2 md:w-1/3 mb-5">
                <LessonBox data={lesson} />
                <a
                  className="text-xs flex items-center justify-end text-neutral-300 opacity-70 hover:opacity-100 relative bottom-3 ml-auto mt-5"
                  href={
                    lesson.sponsorURL || 'https://github.com/aykutkardas/regexlearn.com#sponsoring'
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {lesson.sponsor ? (
                    <span className="flex items-center">
                      Sponsored by{' '}
                      <img className="mx-1 h-3" src={lesson.sponsorLogo} alt={lesson.sponsor} />
                    </span>
                  ) : (
                    <span>Become a Sponsor</span>
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>
        <SupportButton />
        <Footer />
      </div>
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
