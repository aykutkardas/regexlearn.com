import { GetStaticPaths, GetStaticProps } from 'next';
import { FormattedMessage, useIntl } from 'react-intl';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import CustomHead from 'src/components/CustomHead';
// import ProductButton from 'src/components/ProductButton';
import { defaultLocale, locales } from 'src/localization';
import data from 'src/data/cheatsheet.json';
import CheatsheetCollapse from 'src/components/CheatsheetCollapse';

const columns = [data.slice(0, 3), data.slice(3, 4), data.slice(4, 6)];

const PageCheatsheet = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <CustomHead
        title="page.cheatsheet.title"
        description="page.cheatsheet.description"
        hrefLang="cheatsheet"
      />
      <Header />
      <div className="tw-container tw-h-auto tw-items-center tw-flex-1">
        {/* <ProductButton /> */}
        <div className="tw-flex tw-mt-12 tw-gap-4">
          {columns.map((column, index) => (
            <div key={index} className="tw-w-full sm:tw-w-1/2 md:tw-w-1/3">
              {column.map(row => (
                <div key={row.title} className="tw-mb-8">
                  <h4 className="tw-mb-6">
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
