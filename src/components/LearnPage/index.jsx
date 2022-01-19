import React, { useEffect, useState, useCallback } from 'react';
import lookie from 'lookie';

import LearnHeader from 'src/components/LearnHeader';
import LearnFooter from 'src/components/LearnFooter';
import Step from 'src/components/Step';

export default function LearnPage({ data, lessonName }) {
  const lookieKey = `lesson.${lessonName}`;
  const [step, setStep] = useState(0);
  const [lastStep, setLastStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const { lastStep = 0, currentStep = lastStep } = lookie.get(lookieKey) || {};

    setStep(currentStep);
    setLastStep(lastStep);
    setSuccess(currentStep < lastStep);
  }, [lookieKey]);

  const prevStep = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    }
  }, [step, setStep]);

  const nextStep = useCallback(() => {
    if (!success) {
      setError(true);
      clearTimeout(window.learnErrorTimer);
      window.learnErrorTimer = setTimeout(() => setError(false), 1000);
      return;
    }

    if (step < data.length - 1) {
      setError(false);
      setStep(step + 1);
    }
  }, [step, success, data.length]);

  const onChangeSuccess = status => setSuccess(status);

  const handleChangeStep = useCallback(
    e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) {
          prevStep();
        } else {
          nextStep();
        }
      }
    },
    [nextStep, prevStep],
  );

  useEffect(() => {
    document.addEventListener('keypress', handleChangeStep);

    return () => document.removeEventListener('keypress', handleChangeStep);
  }, [step, success, handleChangeStep]);

  useEffect(() => {
    const progress = lookie.get(lookieKey) || {};

    progress.currentStep = step;

    if (step > lastStep) {
      progress.lastStep = step;
    }

    lookie.set(lookieKey, progress);
  }, [step, lastStep, lookieKey]);

  return (
    <>
      <LearnHeader steps={data} step={step} />
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
