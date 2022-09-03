import { GetStaticPaths, GetStaticProps } from 'next';
import cx from 'classnames';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Playground from 'src/components/Playground';
import CheatsheetSidebar from 'src/components/CheatsheetSidebar';
// import ProductButton from 'src/components/ProductButton';
import CustomHead from 'src/components/CustomHead';
import { defaultLocale, locales } from 'src/localization';

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
    <div className="tw-container tw-w-full tw-flex-1 tw-flex tw-mt-16">
      {/* <ProductButton /> */}
      <div className="tw-w-full lg:tw-w-2/3">
        <div className="tw-mr-0 lg:tw-mr-6">
          <Playground />
        </div>
      </div>
      <div className="tw-w-full lg:tw-w-1/3">
        <CheatsheetSidebar />
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
