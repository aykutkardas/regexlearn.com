import { GetStaticPaths, GetStaticProps } from 'next';
import { useIntl, FormattedMessage } from 'react-intl';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import LessonBox from 'src/components/LessonBox';
import SupportButton from 'src/components/SupportButton';
import HighlightedText from 'src/components/HighlightedText';
import { defaultLocale, locales } from 'src/localization';
import globalIntl from 'src/utils/globalIntl';
import lessons from 'src/data/lessons/index.json';

const PageLearn = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="container flex flex-1 flex-col items-between h-full">
      <Header />
      <div className="flex flex-col justify-center flex-1 py-10">
        <div className="flex flex-col md:flex-row items-start gap-10 lg:gap-16">
          <div className="w-full md:w-1/2 flex flex-col items-start md:sticky md:top-28 animate-fade-up">
            <span className="font-mono text-xs text-regreen-400/80 tracking-widest mb-3">
              {'/learn/'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              <FormattedMessage id={'section.learn.title'} />
            </h1>
            <HighlightedText
              element="p"
              className="text-neutral-400 leading-relaxed mt-5"
              text={formatMessage({ id: 'section.learn.content' })}
              attrs={{ className: 'code-chip' }}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-5/12 ltr:ml-auto rtl:mr-auto flex flex-col gap-6">
            {lessons.map(lesson => (
              <div key={lesson.key} className="w-full">
                <LessonBox
                  data={lesson}
                  accent={lesson.key === 'regexForSeo' ? 'orange' : 'green'}
                />
                <a
                  className="text-xs flex items-center justify-end text-neutral-500 hover:text-neutral-200 transition-colors mt-2.5 px-1"
                  href={
                    lesson.creatorURL || 'https://github.com/aykutkardas/regexlearn.com#sponsoring'
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {lesson.creator ? (
                    <span dir="ltr" className="flex items-center">
                      Created by{' '}
                      <img
                        className="mx-1"
                        style={{ height: lesson.logoHeight || 12 }}
                        src={lesson.creatorLogo}
                        alt={lesson.creator}
                      />
                    </span>
                  ) : (
                    <span>Become a Sponsor</span>
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SupportButton />
      <Footer />
    </div>
  );
};

export default PageLearn;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;
  const intl = globalIntl(lang, messages);

  return {
    props: {
      lang,
      messages,
      metadata: {
        title: intl.formatMessage({ id: 'page.learn.title' }),
        description: intl.formatMessage({ id: 'page.learn.description' }),
        hrefLang: 'learn',
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
