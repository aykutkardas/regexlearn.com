import "./App.scss";

import { useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { Switch, Route, HashRouter } from "react-router-dom";
import cx from "classnames";

import localization from "./localization";
import useOS from "./utils/useOS";

import LearnPage from "./pages/LearnPage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFound";

import Alert from "./components/Alert";

function App() {
  const defaultLang = "tr-tr";
  const [lang, setLang] = useState(defaultLang);
  const { isDesktop } = useOS();

  return (
    <IntlProvider
      messages={localization[lang]}
      locale={lang}
      defaultLocale={defaultLang}
    >
      <div className={cx("App", { desktop: isDesktop })}>
        <Alert visible>
          <FormattedMessage id="alert.site.under.development" />
        </Alert>
        <HashRouter>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/learn">
              <LearnPage lang={lang} setLang={setLang} />
            </Route>
            <Route path='*' exact={true}>
              <NotFoundPage />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    </IntlProvider>
  );
}

export default App;
