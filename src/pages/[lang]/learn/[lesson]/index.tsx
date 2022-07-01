import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import Header from 'src/components/Header';
import LearnPage from 'src/components/LearnPage';
import { defaultLocale, locales } from 'src/localization';
import lessons from 'src/data/lessons/index.json';
import CustomHead from 'src/components/CustomHead';
import { Lesson } from 'src/types';

type PageLessonProps = {
  lesson: Lesson;
};

const PageLesson = ({ lesson }: PageLessonProps) => {
  const { query } = useRouter();
  const { formatMessage } = useIntl();

  const data = require(`src/data/lessons/${lesson.key}.js`)?.default;

  const lang = typeof query.lang === 'string' ? query.lang.toUpperCase() : query.lang;
  const title = formatMessage({ id: `lessons.${lesson.key}.title` });

  return (
    <>
      <CustomHead
        title={`${title} - ${lang}`}
        description={`lessons.${lesson.key}.description`}
        hrefLang={`learn/${lesson.key}`}
      >
        <link rel="stylesheet" href="/css/animate.css" />
      </CustomHead>
      <Header isLearnPage />
      <LearnPage data={data} lesson={lesson} />
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
