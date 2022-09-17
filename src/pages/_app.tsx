import 'src/styles/globals.css';

import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';

import { defaultLocale } from 'src/localization';

require('src/migration').migration();

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const preventBrowserShortcut = e => {
      if (e.ctrlKey && e.key.toLowerCase() === 'g') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', preventBrowserShortcut);

    return () => window.removeEventListener('keydown', preventBrowserShortcut);
  }, []);

  return (
    <IntlProvider
      messages={pageProps.messages}
      locale={pageProps.lang}
      defaultLocale={defaultLocale}
    >
      <div className="flex flex-col h-screen text-neutral-50 font-openSans">
        <Component {...pageProps} />
      </div>
    </IntlProvider>
  );
};

export default MyApp;
