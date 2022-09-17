import { GetStaticPaths, GetStaticProps } from 'next';

import Header from 'src/components/Header';
import CustomHead from 'src/components/CustomHead';
import LearnFooter from 'src/components/LearnFooter';
import Step from 'src/components/Step';
import { defaultLocale, locales } from 'src/localization';
import { Lesson } from 'src/types';
import lessons from 'src/data/lessons/index.json';
import { InteractiveAreaProvider } from 'src/context/InteractiveAreaContext';

type PageLessonProps = {
  lesson: Lesson;
};

const PageLesson = ({ lesson }: PageLessonProps) => {
  const lessonData = require(`src/data/lessons/${lesson.key}.js`)?.default;

  return (
    <>
      <CustomHead
        title={`lessons.${lesson.key}.title`}
        description={`lessons.${lesson.key}.description`}
        hrefLang={`learn/${lesson.slug}`}
      >
        <link rel="stylesheet" href="/css/animate.css" />
      </CustomHead>
      <InteractiveAreaProvider key={lessonData} lesson={lesson} lessonData={lessonData}>
        <div className="px-3 flex flex-col flex-1 justify-between">
          <Header page="learn-detail" />
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

  return {
    props: {
      lang,
      messages,
      lesson,
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
