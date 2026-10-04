import { GetStaticPaths, GetStaticProps } from 'next';
import { FormattedMessage, useIntl } from 'react-intl';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import SupportButton from 'src/components/SupportButton';
import CheatsheetCollapse from 'src/components/CheatsheetCollapse';
import { defaultLocale, locales } from 'src/localization';
import globalIntl from 'src/utils/globalIntl';
import data from 'src/data/cheatsheet.json';

const columns = [data.slice(0, 3), data.slice(3, 4), data.slice(4, 6)];

const PageCheatsheet = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="container flex flex-col items-between flex-1">
      <Header />
      <div className="pt-10 pb-8 md:pt-14 animate-fade-up">
        <span className="font-mono text-xs text-regreen-400/80 tracking-widest">{'/cheatsheet/'}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-3">
          <FormattedMessage id="section.cheatsheet.title" />
        </h1>
        <p className="text-neutral-400 leading-relaxed mt-4 max-w-2xl">
          <FormattedMessage id="page.cheatsheet.description" />
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start flex-1">
        {columns.map((column, index) => (
          <div key={index} className="flex flex-col gap-5">
            {column.map(row => (
              <section key={row.title} className="surface rounded-2xl p-3">
                <h2 className="px-2.5 pt-1 pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  <FormattedMessage id={row.title} />
                </h2>
                <div className="flex flex-col gap-0.5">
                  {row.data.map(item => (
                    <CheatsheetCollapse
                      key={item.title}
                      data={item}
                      title={formatMessage({ id: item.title })}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ))}
      </div>
      <SupportButton />
      <Footer />
    </div>
  );
};

export default PageCheatsheet;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;
  const intl = globalIntl(lang, messages);

  return {
    props: {
      lang,
      messages,
      metadata: {
        title: intl.formatMessage({ id: 'page.cheatsheet.title' }),
        description: intl.formatMessage({ id: 'page.cheatsheet.description' }),
        hrefLang: 'cheatsheet',
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
