import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import SeoTags from 'src/components/SeoTags';

import { defaultLocale, locales } from 'src/localization';

const LearnPage = dynamic(import('src/components/LearnPage'), { ssr: false });

export default function Learn() {
  const { formatMessage } = useIntl();
  const { asPath } = useRouter();

  const pageTitle = formatMessage({ id: 'page.learn.title' });
  const pageDescription = formatMessage({ id: 'page.learn.description' });

  // Due to static generation, this page is detected as empty by google bots,
  // so there is a check here.
  const isClient = !(typeof window === 'undefined');

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/animate.css" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <SeoTags title={pageTitle} description={pageDescription} href={asPath} />
      </Head>
      {!isClient && (
        <div>
          <h1>{formatMessage({ id: 'steps.whatIsRegex.title' })}</h1>
          <p>{formatMessage({ id: 'steps.whatIsRegex.description' })}</p>
        </div>
      )}
      <LearnPage lessonName="regex101" />
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
