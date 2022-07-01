import { GetStaticPaths, GetStaticProps } from 'next';
import { FormattedMessage } from 'react-intl';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Collapse from 'src/components/Collapse';
import CheatsheetItemTitle from 'src/components/CheatsheetItemTitle';
import CheatsheetDemo from 'src/components/CheatsheetDemo';
import CustomHead from 'src/components/CustomHead';
import { defaultLocale, locales } from 'src/localization';
import data from 'src/data/cheatsheet.json';

import styles from './Cheatsheet.module.css';

const PageCheatsheet = () => {
  const columns = [data.slice(0, 3), data.slice(3, 4), data.slice(4, 6)];

  return (
    <>
      <CustomHead
        title="page.cheatsheet.title"
        description="page.cheatsheet.description"
        hrefLang="cheatsheet"
      />
      <Header />
      <div className="container flex-1">
        <div className="row">
          <div className="col-lg-12">
            <h1 className={styles.Title}>
              <FormattedMessage id="cheatsheet.section.title" />
            </h1>
            <p className={styles.Description}>
              <FormattedMessage id="cheatsheet.section.description" />
            </p>
          </div>
        </div>
        <div className="row">
          {columns.map((column, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              {column.map(row => (
                <div key={row.title}>
                  <h4>
                    <FormattedMessage id={row.title} />
                  </h4>
                  {row.data.map(item => (
                    <Collapse
                      key={item.title}
                      title={<CheatsheetItemTitle data={item} />}
                      description={item.description}
                    >
                      <CheatsheetDemo data={item} />
                    </Collapse>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageCheatsheet;

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
