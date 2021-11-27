import "../styles/globals.css";
import "../styles/plugins/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

import { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import lookie from "lookie";
import { ToastContainer } from "react-toastify";

import { Provider as LanguageProvider } from "../contexts/LanguageContext";
import localization from "../localization";

const defaultLang = "en-us";

function MyApp({ Component, pageProps }) {
  const [lang, setLang] = useState(defaultLang);

  const handleChangeLang = (newLang) => {
    lookie.set("lang", newLang);
    setLang(newLang);
  };

  useEffect(() => {
    setLang(lookie.get("lang") || "en-us");
  }, []);

  return (
    <IntlProvider
      messages={localization[lang]}
      locale={lang}
      defaultLocale={defaultLang}
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
