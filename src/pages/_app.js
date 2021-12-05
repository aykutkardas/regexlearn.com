import "src/styles/globals.css";
import "src/styles/plugins/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { ToastContainer } from "react-toastify";

import { Provider as LanguageProvider } from "src/contexts/LanguageContext";
import localization, { defaultLocale } from "src/localization";

function MyApp({ Component, pageProps }) {
  const [lang, setLang] = useState(pageProps.lang || defaultLocale);

  const handleChangeLang = (newLang) => {
    setLang(newLang);
  };

  useEffect(() => {
    setLang(pageProps.lang || defaultLocale);
  }, [pageProps.lang]);

  return (
    <IntlProvider
      messages={localization[lang]}
      locale={lang}
      defaultLocale={defaultLocale}
    >
      <LanguageProvider lang={lang} setLang={handleChangeLang}>
        <ToastContainer />
        <div className="App">
          <Component {...pageProps} />
        </div>
      </LanguageProvider>
    </IntlProvider>
  );
}

export default MyApp;
