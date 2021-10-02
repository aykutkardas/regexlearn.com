import { useEffect, useState, useCallback } from "react";
import Mousetrap from "mousetrap";
import "mousetrap-global-bind";

import Header from "../../components/Header";
import Step from "../../components/Step";
import Navigation from "../../components/Navigation";

import data from "../../data.json";
import shortcuts from "../../shortcuts";

function LearnPage({ lang, setLang }) {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const prevStep = useCallback(
    (e) => {
      e.preventDefault();

      if (step > 0) {
        setStep(step - 1);
      }
    },
    [step]
  );

  const nextStep = useCallback(
    (e) => {
      e.preventDefault();

      if (!success) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1000);
        return;
      };

      if (step < data.length - 1) {
        setError(false);
        setStep(step + 1);
      }
    },
    [step, success]
  );

  const onChangeSuccess = (status) => {
    setSuccess(status);
  };

  useEffect(() => {
    Mousetrap.bindGlobal(shortcuts.rootKey, (e) => e.preventDefault());
    Mousetrap.bindGlobal(shortcuts.prevStep, prevStep);
    Mousetrap.bindGlobal(shortcuts.nextStep, nextStep);

    return () =>
      Mousetrap.unbindGlobal([
        shortcuts.prevStep,
        shortcuts.nextStep,
        shortcuts.rootKey,
      ]);
  }, [step, success, prevStep, nextStep]);

  return (
    <>
      <Header lang={lang} setLang={setLang} steps={data} step={step} />
      <Step data={data[step]} step={step} onChangeSuccess={onChangeSuccess} error={error} />
      <Navigation
        steps={data}
        step={step}
        prevStep={prevStep}
        nextStep={nextStep}
        success={success}
        error={error}
      />
    </>
  );
}

export default LearnPage;
