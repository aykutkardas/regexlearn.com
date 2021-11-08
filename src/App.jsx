import "./App.scss";

import { useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { Switch, Route, HashRouter } from "react-router-dom";
import cx from "classnames";
import lookie from "lookie";

import LearnPage from "@pages/LearnPage";
import LandingPage from "@pages/LandingPage";
import NotFoundPage from "@pages/NotFound";

import Alert from "@components/Alert";

import useOS from "@utils/useOS";
import { Provider as LanguageProvider } from "./contexts/LanguageContext";
import localization from "./localization";

function App() {
  const defaultLang = lookie.get("lang") || "en-us";
  const [lang, setLang] = useState(defaultLang);
  const { isDesktop } = useOS();

  const handleChangeLang = (newLang) => {
    lookie.set("lang", newLang);
    setLang(newLang);
  };

  return (
    <IntlProvider
      messages={localization[lang]}
      locale={lang}
      defaultLocale={defaultLang}
    >
      <LanguageProvider lang={lang} setLang={handleChangeLang}>
        <div className={cx("App", { desktop: isDesktop })}>
          <Alert>
            <FormattedMessage id="alert.site.under.development" />
          </Alert>
          <HashRouter>
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route path="/learn">
                <LearnPage />
              </Route>
              <Route path="*" exact>
                <NotFoundPage />
              </Route>
            </Switch>
          </HashRouter>
        </div>
      </LanguageProvider>
    </IntlProvider>
  );
}

export default App;
