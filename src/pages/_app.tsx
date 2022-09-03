import 'src/styles/globals.css';

import { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';

import { defaultLocale } from 'src/localization';

require('src/migration').migration();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <IntlProvider messages={pageProps.messages} locale={pageProps.lang} defaultLocale={defaultLocale}>
    <div className="tw-flex tw-flex-col tw-h-screen dark:tw-text-neutral-50 tw-font-openSans">
      <Component {...pageProps} />
    </div>
  </IntlProvider>
);

export default MyApp;
