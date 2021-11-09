import { useEffect, useState, useCallback } from "react";

import lookie from "lookie";

import Header from "../LearnHeader";
import Step from "../Step";
import Navigation from "../Navigation";

import data from "../../data.json";
import shortcuts from "../../shortcuts";
import hotkeys from "../../utils/hotkeys";


export default function Learn() {
  const progress = lookie.get("completedSteps") || [];
  const lastStep = lookie.get("lastStep") || 0;
  const [step, setStep] = useState(lastStep);
  const [success, setSuccess] = useState(progress.includes(data[step]));
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
        clearTimeout(window.learnErrorTimer);
        window.learnErrorTimer = setTimeout(() => {
          setError(false);
        }, 1000);
        return;
      }

      if (step < data.length - 1) {
        setError(false);
        setStep(step + 1);
      }
    },
    [step, success]
  );

  const onChangeSuccess = (status) => {
    console.log({status})
    setSuccess(status);
  };

  useEffect(() => {
    hotkeys(shortcuts.rootKey, (e) => e.preventDefault());
    hotkeys(shortcuts.prevStep, prevStep);
    hotkeys(shortcuts.nextStep, nextStep);

    lookie.set("lastStep", step);

    return () => {
      hotkeys.unbind(shortcuts.rootKey);
      hotkeys.unbind(shortcuts.prevStep);
      hotkeys.unbind(shortcuts.nextStep);
    }
  }, [step, success, prevStep, nextStep]);

  return (
    <>
      <Header steps={data} step={step} />
      <Step
        data={data[step]}
        step={step}
        onChangeSuccess={onChangeSuccess}
        error={error}
      />
      <Navigation
        steps={data}
        step={step}
        prevStep={prevStep}
        nextStep={nextStep}
        success={success}
        error={error}
      />
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {},
  }
}
