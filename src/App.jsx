import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { ToastContainer } from "react-toastify";
import Mousetrap from "mousetrap";
import "mousetrap-global-bind";

import localization from "./localization";
import Header from "./components/Header";
import Step from "./components/Step";
import Navigation from "./components/Navigation";

import getOS from "./utils/getOS";

import data from "./data.json";
import shortcut from "./shortcut";

function App() {
  const currentOS = getOS();
  const isDesktop = ["Windows", "Mac OS", "Linux"].includes(currentOS);
  const defaultLang = "tr-tr";
  const [lang, setLang] = useState(defaultLang);
  const [step, setStep] = useState(0);

  const prevStep = (e) => {
    e.preventDefault();

    if (step > 0) {
      setStep(step - 1);
    }
  };

  const nextStep = (e) => {
    e.preventDefault();

    if (step < data.length - 1) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    Mousetrap.bindGlobal(shortcut.rootKey, (e) => e.preventDefault());
    Mousetrap.bindGlobal(shortcut.prevStep, prevStep);
    Mousetrap.bindGlobal(shortcut.nextStep, nextStep);

    return () =>
      Mousetrap.unbindGlobal([
        shortcut.prevStep,
        shortcut.nextStep,
        shortcut.rootKey,
      ]);
  }, [step]);

  return (
    <IntlProvider
      messages={localization[lang]}
      locale={lang}
      defaultLocale={defaultLang}
    >
      <div className={"App " + (isDesktop ? "desktop" : "")}>
        <Header lang={lang} setLang={setLang} />
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
