import { GetStaticPaths, GetStaticProps } from 'next';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import PlaygroundEditor from 'src/components/PlaygroundEditor';
import PlaygroundSidebar from 'src/components/PlaygroundSidebar';
import CustomHead from 'src/components/CustomHead';
import SupportButton from 'src/components/SupportButton';
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
    <div className="container-full flex flex-col h-screen items-between flex-1 bg-neutral-800">
      <Header page="playground" />
      <div className="flex flex-1 h-full flex-col items-center justify-center sm:flex-row ">
        <div className="w-full sm:w-4/6 xl:w-5/6 h-[calc(100vh-5rem)] overflow-y-scroll p-4">
          <PlaygroundEditor />
        </div>
        <div className="w-full hidden sm:block sm:w-2/6 xl:w-1/6 h-full border-l border-neutral-700">
          <PlaygroundSidebar />
        </div>
      </div>
      {/* <SupportButton /> */}
      {/* <Footer /> */}
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
