import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import Header from 'src/components/Header';
import SeoTags from 'src/components/SeoTags';
import LearnPage from 'src/components/LearnPage';
import { defaultLocale, locales } from 'src/localization';
import lessons from 'src/data/lessons/index.json';

type PageLessonProps = {
  lessonName: string;
};

const PageLesson = ({ lessonName }: PageLessonProps) => {
  const { query, asPath } = useRouter();
  const { formatMessage } = useIntl();

  const data = require(`src/data/lessons/${lessonName}`)?.default;

  const lang = typeof query.lang === 'string' ? query.lang.toUpperCase() : query.lang;

  const title = formatMessage({ id: `lessons.${lessonName}.title` });
  const pageTitle = `${title} - ${lang}`;
  const pageDescription = formatMessage({ id: `lessons.${lessonName}.description` });

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/animate.css" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="alternate" hrefLang="en" href={`https://regexlearn.com/learn/${lessonName}`} />
        <link
          rel="alternate"
          hrefLang="ru"
          href={`https://regexlearn.com/ru/learn/${lessonName}`}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={`https://regexlearn.com/es/learn/${lessonName}`}
        />
        <link
          rel="alternate"
          hrefLang="tr"
          href={`https://regexlearn.com/tr/learn/${lessonName}`}
        />
        <link
          rel="alternate"
          hrefLang="zh-cn"
          href={`https://regexlearn.com/zh-cn/learn/${lessonName}`}
        />
        <SeoTags title={pageTitle} description={pageDescription} href={asPath} />
      </Head>
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
