import { GetStaticPaths, GetStaticProps } from 'next';

import Header from 'src/components/Header';
import PlaygroundEditor from 'src/components/PlaygroundEditor';
import PlaygroundSidebar from 'src/components/PlaygroundSidebar';
import CustomHead from 'src/components/CustomHead';
import { defaultLocale, locales } from 'src/localization';
import Icon from 'src/components/Icon';
import ReportPlayground from 'src/components/ReportPlayground';

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
      <div className="flex flex-1 flex-col h-[calc(100vh-5rem)] items-center justify-center sm:flex-row ">
        <div className="w-full  overflow-y-scroll p-4">
          <PlaygroundEditor />
        </div>
        <div className="hidden sm:flex flex-col w-[400px] h-full border-l border-neutral-700">
          <PlaygroundSidebar />
          <div className="h-44 border-t py-2 border-neutral-700 sticky bottom-0">
            <ReportPlayground />
            <a
              href="https://github.com/sponsors/aykutkardas"
              target="_blank"
              rel="noreferrer"
              aria-label="Sponsor Me"
              title="Sponsor Me"
            >
              <div className="w-full h-6 text-xs cursor-pointer hover:opacity-70 transition inline-flex items-center p-2">
                <Icon icon="hearth" className="mr-1 text-fuchsia-500" size={18} />
                <span className="text-neutral-300">Sponsor Me</span>
              </div>
            </a>
            <a
              href="https://www.buymeacoffee.com/aykutkardas"
              target="_blank"
              rel="noreferrer"
              aria-label="Buy Me a Coffee"
              title="Buy Me a Coffee"
            >
              <div className="w-full h-6 text-xs cursor-pointer hover:opacity-70 transition inline-flex items-center p-2">
                <Icon icon="coffee" className="mr-1 text-yellow-500" size={18} />
                <span className="text-neutral-300">Buy Me a Coffee</span>
              </div>
            </a>
          </div>
        </div>
      </div>
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
