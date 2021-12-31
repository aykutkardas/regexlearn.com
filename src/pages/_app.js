import 'src/styles/globals.css';
import 'src/styles/plugins/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { ToastContainer } from 'react-toastify';

import { Provider as LanguageProvider } from 'src/contexts/LanguageContext';
import { defaultLocale } from 'src/localization';

function MyApp({ Component, pageProps }) {
  const [messages] = useState(pageProps.messages || {});
  const [lang] = useState(pageProps.lang || defaultLocale);

  return (
    <IntlProvider messages={messages} locale={lang} defaultLocale={defaultLocale}>
      <LanguageProvider lang={lang}>
        <ToastContainer />
        <div className="App">
          <Component {...pageProps} />
        </div>
      </LanguageProvider>
    </IntlProvider>
  );
}

export default MyApp;
