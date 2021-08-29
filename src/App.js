import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { ToastContainer } from "react-toastify";
import mousetrap from "mousetrap";
import "mousetrap-global-bind";

import localization from "./localization";
import Step from "./components/Step";
import Navigation from "./components/Navigation";

import data from "./data.json";

function App() {
  const defaultLang = "tr-tr";
  const [lang, setLang] = useState(defaultLang);
  const [step, setStep] = useState(0);

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const nextStep = () => {
    if (step < data.length - 1) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    mousetrap.bindGlobal(["ctrl+left", "command+left"], prevStep);
    mousetrap.bindGlobal(["ctrl+right", "command+right"], nextStep);

    return () =>
      mousetrap.unbindGlobal([
        "ctrl+left",
        "ctrl+right",
        "command+left",
        "command+right",
      ]);
  }, [step]);

  return (
    <IntlProvider
      messages={localization[lang]}
      locale={lang}
      defaultLocale={defaultLang}
    >
      <div className="App">
        <Step data={data[step]} step={step} />
        <Navigation
          steps={data}
          step={step}
          prevStep={prevStep}
          nextStep={nextStep}
        />
        <ToastContainer />
      </div>
    </IntlProvider>
  );
}

export default App;
