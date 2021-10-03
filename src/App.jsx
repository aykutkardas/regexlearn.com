import "./App.scss";

import { useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { Route, HashRouter } from "react-router-dom";
import cx from "classnames";

import localization from "./localization";
import useOS from "./utils/useOS";
import LearnPage from "./pages/LearnPage";
import LandingPage from "./pages/LandingPage/index";
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
      <HashRouter>
        <div className={cx("App", { desktop: isDesktop })}>
            <Alert visible>
              <FormattedMessage id="alert.site.under.development" />
            </Alert>      
            <Route exact path="/" component={LandingPage} />    
            <Route path="/learn" component={LearnPage} lang={lang} setLang={setLang} />
        </div>
      </HashRouter>
    </IntlProvider>
  );
}

export default App;
