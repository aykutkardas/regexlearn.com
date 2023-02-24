import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import Header from 'src/components/Header';
import LearnFooter from 'src/components/LearnFooter';
import Step from 'src/components/Step';
import LearnProgress from 'src/components/LearnProgress';
import { defaultLocale, locales } from 'src/localization';
import { Lesson } from 'src/types';
import { InteractiveAreaProvider } from 'src/context/InteractiveAreaContext';
import globalIntl from 'src/utils/globalIntl';
import lessons from 'src/data/lessons/index.json';

type PageLessonProps = {
  lesson: Lesson;
};

const PageLesson = ({ lesson }: PageLessonProps) => {
  const lessonData = require(`src/data/lessons/${lesson.key}.js`)?.default;

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/animate.css" />
      </Head>
      <InteractiveAreaProvider key={lessonData} lesson={lesson} lessonData={lessonData}>
        <div className="px-3 flex flex-col flex-1 justify-between relative overflow-x-hidden">
          <Header page="learn-detail" />
          <LearnProgress />
          <Step />
          <LearnFooter />
        </div>
      </InteractiveAreaProvider>
    </>
  );
};

export default PageLesson;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;
  const lesson = lessons.find(({ slug }) => slug === params.lesson);
  const intl = globalIntl(lang, messages);

  return {
    props: {
      lang,
      messages,
      lesson,
      metadata: {
        title: intl.formatMessage({ id: `lessons.${lesson.key}.title` }),
        description: intl.formatMessage({ id: `lessons.${lesson.key}.description` }),
        hrefLang: `learn/${lesson.slug}`,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];

  locales.forEach(lang => {
    lessons.forEach(lesson => {
      paths.push({
        params: {
          lang,
          lesson: lesson.slug,
        },
      });
    });
  });

  return {
    fallback: false,
    paths,
  };
};
