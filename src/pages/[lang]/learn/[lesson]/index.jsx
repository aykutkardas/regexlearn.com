import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import SeoTags from 'src/components/SeoTags';
import LearnPage from 'src/components/LearnPage';

import { defaultLocale, locales } from 'src/localization';

import lessons from 'src/data/lessons/index.json';

export default function Course({ lessonName }) {
  const data = require(`src/data/lessons/${lessonName}`)?.default;

  const { formatMessage } = useIntl();
  const { asPath } = useRouter();

  const pageTitle = formatMessage({ id: 'page.learn.title' });
  const pageDescription = formatMessage({ id: 'page.learn.description' });

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/animate.css" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <SeoTags title={pageTitle} description={pageDescription} href={asPath} />
      </Head>
      <LearnPage data={data} lessonName={lessonName} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;

  return {
    props: {
      lang,
      messages,
      lessonName: params.lesson,
    },
  };
}

export async function getStaticPaths() {
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
}
