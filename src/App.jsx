import "./App.scss";

import { useState } from "react";
import { IntlProvider } from "react-intl";
import { Switch, Route, HashRouter } from "react-router-dom";
import cx from "classnames";

import localization from "./localization";
import useOS from "./utils/useOS";
import LearnPage from "./pages/LearnPage";
import LandingPage from "./pages/LandingPage/index";
import LandingHeader from "./components/LandingHeader";

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
      <HashRouter>
        <LandingHeader />
        <div className={cx("App", { desktop: isDesktop })}>
          <Switch>
            <Route path="/learn">
              <LearnPage lang={lang} setLang={setLang} />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    </IntlProvider>
  );
}

export default App;
