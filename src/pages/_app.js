import 'src/styles/globals.css';
import 'src/styles/plugins/bootstrap.css';

import { useState } from 'react';
import { IntlProvider } from 'react-intl';

import { Provider as LanguageProvider } from 'src/contexts/LanguageContext';
import { defaultLocale } from 'src/localization';

require('src/migration').migration();

function MyApp({ Component, pageProps }) {
  const [messages] = useState(pageProps.messages || {});
  const [lang] = useState(pageProps.lang || defaultLocale);

  return (
    <IntlProvider messages={messages} locale={lang} defaultLocale={defaultLocale}>
      <LanguageProvider lang={lang}>
        <div className="App">
          <Component {...pageProps} />
        </div>
      </LanguageProvider>
    </IntlProvider>
  );
}

export default MyApp;
