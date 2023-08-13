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
      <div className="flex h-auto flex-1 flex-wrap mt-[12%]">
        {columns.map((column, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3">
            <div className="flex flex-col mr-0 md:mr-8">
              {column.map(row => (
                <div key={row.title} className="mb-8">
                  <h4 className="mb-6 text-white">
                    <FormattedMessage id={row.title} />
                  </h4>
                  {row.data.map(item => (
                    <CheatsheetCollapse
                      key={item.title}
                      data={item}
                      title={formatMessage({ id: item.title })}
                    />
                  ))}
                </div>
              ))}
            </div>
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
