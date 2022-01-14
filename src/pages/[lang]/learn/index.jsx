import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntl, FormattedMessage } from 'react-intl';
import cx from 'classnames';

import SeoTags from 'src/components/SeoTags';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import LessonBox from 'src/components/LessonBox';

import tagWrapper from 'src/utils/tagWrapper';

import { defaultLocale, locales } from 'src/localization';

import lessons from 'src/data/lessons/index.json';

import * as styles from './Learn.module.css';

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
        <div className={cx('row', styles.Section)}>
          <div className={cx('col-xs-12 col-sm-12 col-md-8', styles.SectionContentWrapper)}>
            <h2 className={styles.SectionTitle}>
              <FormattedMessage id={'section.learn.title'} />
            </h2>
            <p
              className={styles.SectionDescription}
              dangerouslySetInnerHTML={{
                __html: tagWrapper(
                  formatMessage({ id: 'section.learn.content' }),
                  /`(\S*?[^`]*)`/gim,
                  styles.SectionHighlight,
                ),
              }}
            />
          </div>
          <div className={cx('col-xs-12 col-sm-12 col-md-4', styles.SectionImageWrapper)}>
            <img
              src="/Learn.webp"
              loading="lazy"
              className={cx('img-responsive', styles.SectionImage)}
              alt={formatMessage({ id: 'section.learn.imageAltText' })}
            />
          </div>
        </div>
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
