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
          <div className="h-44 min-h-[100px] border-t py-2 flex flex-col items-center justify-between border-neutral-700 sticky bottom-0">
            <a
              href="https://www.altogic.com/?utm_source=regexlearn&utm_medium=referral"
              target="_blank"
              rel="noreferrer"
              className="opacity-100 hover:opacity-70 w-auto h-auto flex text-xs items-center text-neutral-300"
            >
              Powered by
              <img className="w-16 ml-1" src={'/altogic.svg'} alt="Altogic" title="Altogic" />
            </a>

            <div className="flex gap-x-2 justify-center">
              <a
                href="https://github.com/sponsors/aykutkardas"
                target="_blank"
                rel="noreferrer"
                aria-label="Sponsor Me"
                title="Sponsor Me"
              >
                <div className="w-6 h-6 cursor-pointer hover:scale-110 transition inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 shadow-xl">
                  <Icon icon="hearth" className="text-white" size={14} />
                </div>
              </a>
              <a
                href="https://www.buymeacoffee.com/aykutkardas"
                target="_blank"
                rel="noreferrer"
                aria-label="Buy Me a Coffee"
                title="Buy Me a Coffee"
              >
                <div className="w-6 h-6 cursor-pointer hover:scale-110 transition inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-500 shadow-xl">
                  <Icon icon="coffee" className="text-white" size={14} />
                </div>
              </a>
            </div>
            <ReportPlayground />
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
