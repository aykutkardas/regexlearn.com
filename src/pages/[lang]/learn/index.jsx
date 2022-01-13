import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import SeoTags from 'src/components/SeoTags';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import LessonBox from 'src/components/LessonBox';

import { defaultLocale, locales } from 'src/localization';

import lessons from 'src/data/lessons/index.json';

export default function Learn() {
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
      <Header />
      <div className="container">
        <div className="row">
          {lessons.map(lesson => (
            <div key={lesson.key} className="col-xs-12 col-sm-4 col-md-3">
              <LessonBox data={lesson} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
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
    },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: locales.map(lang => ({
      params: {
        lang,
      },
    })),
  };
}
