import '../styles/globals.scss'
import '../styles/index.scss'
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

import { useState, useEffect } from 'react';
import { IntlProvider } from "react-intl";
import cx from "classnames";
import lookie from "lookie";
import Head from 'next/head'
import { ToastContainer } from "react-toastify";

import { Provider as LanguageProvider } from "../contexts/LanguageContext";
import localization from "../localization";
import getOS from "../utils/useOS";

const defaultLang = "en-us";

function MyApp({ Component, pageProps }) {
  const [lang, setLang] = useState(defaultLang);
  const [isDesktop, setDesktop] = useState(defaultLang);

  const handleChangeLang = (newLang) => {
    lookie.set("lang", newLang);
    setLang(newLang);
  };

  useEffect(() => {
    setLang(lookie.get("lang") || "en-us");
    setDesktop(getOS().isDesktop);
  }, []);

  return (
    <IntlProvider
      messages={localization[lang]}
      locale={lang}
      defaultLocale={defaultLang}
    >
      <LanguageProvider lang={lang} setLang={handleChangeLang}>
        <ToastContainer />
        <div className={cx("App", { desktop: isDesktop })}>
          <Head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZNDXNCMG6E" />
            <script dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-ZNDXNCMG6E');
            `}} />
            <link rel="shortcut icon" href="/favicon.svg" />
            <meta name="description" content="Learn RegEx, step by step, zero to advanced. Playground and Cheatsheet." />
          </Head>
          <Component {...pageProps} />
        </div>
      </LanguageProvider>
    </IntlProvider>
  )


}

export default MyApp