import { GetStaticPaths, GetStaticProps } from 'next';
import { useIntl, FormattedMessage } from 'react-intl';
import cx from 'classnames';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import LessonBox from 'src/components/LessonBox';
import CustomHead from 'src/components/CustomHead';
import tagWrapper from 'src/utils/tagWrapper';
import { defaultLocale, locales } from 'src/localization';
import lessons from 'src/data/lessons/index.json';

import styles from './Learn.module.css';

const PageLearn = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <CustomHead title="page.learn.title" description="page.learn.description" hrefLang="learn">
        <link rel="stylesheet" href="/css/animate.css" />
      </CustomHead>
      <Header />
      <div className="container">
        <div className={cx('row', styles.Section)}>
          <div className={cx('col-xs-12 col-sm-12 col-md-8', styles.SectionContentWrapper)}>
            <h1 className={styles.SectionTitle}>
              <FormattedMessage id={'section.learn.title'} />
            </h1>
            <p
              className={styles.SectionDescription}
              dangerouslySetInnerHTML={{
                __html: tagWrapper({
                  value: formatMessage({ id: 'section.learn.content' }),
                  regex: /`(\S*?[^`]*)`/gim,
                  attributes: { class: styles.SectionHighlight },
                }),
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
          <div className="col-xs-12 col-sm-4 col-md-3">
            <LessonBox
              lock
              data={{
                key: null,
                title: 'lessons.regexForSeo.title',
                description: '15/04/2022',
              }}
            />
            <span className={styles.LessonSponsor}>
              Sponsored by{' '}
              <a
                href="https://ahrefs.com/?utm_source=regexlearn&utm_medium=referral&utm_campaign=sponsorship"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/ahrefs.webp" alt="ahrefs" />
              </a>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageLearn;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;

  return {
    props: {
      lang,
      messages,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: locales.map(lang => ({
      params: {
        lang,
      },
    })),
  };
};
