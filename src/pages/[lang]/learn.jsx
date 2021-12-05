import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useIntl } from 'react-intl';

import { defaultLocale, locales } from 'src/localization';

const LearnPage = dynamic(import('src/components/LearnPage'), { ssr: false });

export default function Learn() {
  const { formatMessage } = useIntl();

  // Due to static generation, this page is detected as empty by google bots,
  // so there is a check here.
  const isClient = !(typeof window === 'undefined');

  return (
    <>
      <Head>
        <title>{formatMessage({ id: 'page.learn.title' })}</title>
        <link rel="canonical" href="https://regexlearn.com/learn" />
        <meta name="description" content={formatMessage({ id: 'page.learn.description' })} />
        <link rel="stylesheet" href="/css/animate.css" />
      </Head>
      {!isClient && (
        <div>
          <h1>{formatMessage({ id: 'steps.whatIsRegex.title' })}</h1>
          <p>{formatMessage({ id: 'steps.whatIsRegex.description' })}</p>
        </div>
      )}
      <LearnPage />
    </>
  );
}

export async function getStaticProps({ params }) {
  return {
    props: {
      lang: params.lang,
    },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: locales
      .filter(locale => locale !== defaultLocale)
      .map(lang => ({
        params: {
          lang,
        },
      })),
  };
}
