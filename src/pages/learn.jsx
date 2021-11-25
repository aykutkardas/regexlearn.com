import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useIntl } from 'react-intl';

const LearnPage = dynamic(import('../components/LearnPage'), { ssr: false });

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

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
