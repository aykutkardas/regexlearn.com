import { GetStaticPaths, GetStaticProps } from 'next';

import Header from 'src/components/Header';
import PlaygroundEditor from 'src/components/PlaygroundEditor';
import PlaygroundSidebar from 'src/components/PlaygroundSidebar';
import { defaultLocale, locales } from 'src/localization';
import Icon from 'src/components/Icon';
import ReportPlayground from 'src/components/ReportPlayground';
import globalIntl from 'src/utils/globalIntl';

const PagePlayground = () => (
  <div className="container-full flex flex-col h-screen items-between flex-1 bg-ink-900">
    <Header page="playground" />
    <div className="flex flex-1 flex-col min-h-0 md:flex-row">
      <div className="w-full flex-1 min-h-0 p-4">
        <PlaygroundEditor />
      </div>
      <aside className="hidden md:flex flex-col w-[300px] lg:w-[380px] shrink-0 h-full min-h-0 border-l rtl:border-l-0 rtl:border-r border-white/6 bg-ink-950/30">
        <PlaygroundSidebar />
        <div className="h-14 shrink-0 border-t px-3 flex items-center justify-between border-white/6">
          <ReportPlayground />
          <a
            href="https://www.buymeacoffee.com/aykutkardas"
            target="_blank"
            rel="noreferrer"
            aria-label="Buy Me a Coffee"
            title="Buy Me a Coffee"
          >
            <span className="w-7 h-7 hover:scale-110 transition inline-flex items-center justify-center rounded-full bg-linear-to-tr/srgb from-yellow-600 to-yellow-400 text-ink-950 shadow-lg shadow-yellow-500/20">
              <Icon icon="coffee" size={15} />
            </span>
          </a>
        </div>
      </aside>
    </div>
  </div>
);

export default PagePlayground;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;
  const intl = globalIntl(lang, messages);

  return {
    props: {
      lang,
      messages,
      metadata: {
        title: intl.formatMessage({ id: 'page.playground.title' }),
        description: intl.formatMessage({ id: 'page.playground.description' }),
        hrefLang: 'playground',
      },
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
