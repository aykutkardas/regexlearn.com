import 'src/styles/globals.css';
import 'src/styles/plugins/bootstrap.css';

import { IntlProvider } from 'react-intl';

import { defaultLocale } from 'src/localization';

require('src/migration').migration();

const MyApp = ({ Component, pageProps }) => {
  const { messages, lang } = pageProps;

  return (
    <IntlProvider messages={messages} locale={lang} defaultLocale={defaultLocale}>
      <div className="App">
        <Component {...pageProps} />
      </div>
    </IntlProvider>
  )
};

export default MyApp;
