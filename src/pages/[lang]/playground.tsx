import { GetStaticPaths, GetStaticProps } from 'next';
import cx from 'classnames';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Playground from 'src/components/Playground';
import CheatsheetSidebar from 'src/components/CheatsheetSidebar';
import ProductButton from 'src/components/ProductButton';
import CustomHead from 'src/components/CustomHead';
import { defaultLocale, locales } from 'src/localization';

import styles from './Playground.module.css';

const PagePlayground = () => (
  <>
    <CustomHead
      title="page.playground.title"
      description="page.playground.description"
      hrefLang="playground"
    >
      <link rel="stylesheet" href="/css/animate.css" />
    </CustomHead>
    <Header />
    <div className={cx('container', styles.PlaygroundContainer)}>
      <ProductButton />
      <div className="row">
        <div className="col-xs-12 col-md-12 col-lg-8">
          <Playground />
        </div>
        <div className="col-xs-12 col-md-12 col-lg-4">
          <CheatsheetSidebar />
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default PagePlayground;

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
