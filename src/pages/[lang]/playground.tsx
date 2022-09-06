import { GetStaticPaths, GetStaticProps } from 'next';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import PlaygroundEditor from 'src/components/PlaygroundEditor';
import PlaygroundSidebar from 'src/components/PlaygroundSidebar';
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
    <div className="container flex flex-col items-between flex-1">
      <Header />
      <div className="flex flex-1 h-full flex-col items-center justify-center lg:flex-row ">
        <div className="w-full lg:w-2/3">
          <div className="mr-0 lg:mr-6">
            <PlaygroundEditor />
          </div>
        </div>
        <div className="w-full lg:w-1/3 mt-5 lg:mt-0">
          <PlaygroundSidebar />
        </div>
      </div>
      <Footer />
    </div>
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
