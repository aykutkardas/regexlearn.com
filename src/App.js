import "./App.css";
import { useState } from "react";
import { IntlProvider } from "react-intl";
import localization from "./localization";
import Step from "./components/Step";
import data from "./data.json";

function App() {
  const defaultLang = "en-us";
  const [lang, setLang] = useState(defaultLang);
  const [step, setStep] = useState(0);

  return (
    <IntlProvider
      messages={localization[lang]}
      locale={lang}
      defaultLocale={defaultLang}
    >
      <div className="App">
        <Step data={data[step]} />
      </div>
    </IntlProvider>
  );
}

export default App;
