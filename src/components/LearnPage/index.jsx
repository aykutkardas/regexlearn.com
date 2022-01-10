import { useEffect, useState, useCallback } from 'react';

import lookie from 'lookie';

import Header from 'src/components/LearnHeader';
import Step from 'src/components/Step';
import LearnFooter from 'src/components/LearnFooter';

import Mousetrap from 'src/utils/mousetrap';
import data from 'src/data/lessons/regex-101';
import shortcuts from 'src/shortcuts';

export default function LearnPage({ lessonName }) {
  const lookieKey = `lesson.${lessonName}`;
  const { lastStep = 0, currentStep = lastStep } = lookie.get(lookieKey) || {};
  const [step, setStep] = useState(currentStep);
  const [success, setSuccess] = useState(currentStep < lastStep);
  const [error, setError] = useState(false);

  const prevStep = useCallback(
    e => {
      e.preventDefault();

      if (step > 0) {
        setStep(step - 1);
      }
    },
    [step],
  );

  const nextStep = useCallback(
    e => {
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
    [step, success],
  );

  const onChangeSuccess = status => {
    setSuccess(status);
  };

  useEffect(() => {
    Mousetrap.bindGlobal(shortcuts.rootKey, e => e.preventDefault());
    Mousetrap.bindGlobal(shortcuts.prevStep, prevStep);
    Mousetrap.bindGlobal(shortcuts.nextStep, nextStep);

    const progress = lookie.get(lookieKey) || {};
    progress.currentStep = step;

    lookie.set(lookieKey, progress);

    if (step > lastStep) {
      progress.lastStep = step;
      lookie.set(lookieKey, progress);
    }

    return () => {
      Mousetrap.unbind(shortcuts.rootKey);
      Mousetrap.unbind(shortcuts.prevStep);
      Mousetrap.unbind(shortcuts.nextStep);
    };
  }, [step, lastStep, success, prevStep, nextStep, lookieKey]);

  return (
    <>
      <Header steps={data} step={step} />
      <Step
        lessonName={lessonName}
        data={data[step]}
        step={step}
        onChangeSuccess={onChangeSuccess}
        error={error}
      />
      <LearnFooter
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

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
