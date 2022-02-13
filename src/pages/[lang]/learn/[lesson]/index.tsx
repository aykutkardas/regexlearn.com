import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import Header from 'src/components/Header';
import LearnPage from 'src/components/LearnPage';
import { defaultLocale, locales } from 'src/localization';
import lessons from 'src/data/lessons/index.json';
import CustomHead from 'src/components/CustomHead';

type PageLessonProps = {
  lessonName: string;
};

const PageLesson = ({ lessonName }: PageLessonProps) => {
  const { query } = useRouter();
  const { formatMessage } = useIntl();

  const data = require(`src/data/lessons/${lessonName}`)?.default;

  const lang = typeof query.lang === 'string' ? query.lang.toUpperCase() : query.lang;
  const title = formatMessage({ id: `lessons.${lessonName}.title` });

  return (
    <>
      <CustomHead
        title={`${title} - ${lang}`}
        description={`lessons.${lessonName}.description`}
        hrefLang={`learn/${lessonName}`}
      >
        <link rel="stylesheet" href="/css/animate.css" />
      </CustomHead>
      <Header isLearnPage />
      <LearnPage data={data} lessonName={lessonName} />
    </>
  );
};

export default PageLesson;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;

  return {
    props: {
      lang,
      messages,
      lessonName: params.lesson,
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
          lesson: lesson.key,
        },
      });
    });
  });

  return {
    fallback: false,
    paths,
  };
};
