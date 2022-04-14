import React, { useEffect, useState } from 'react';
import useEventListener from '@use-it/event-listener';
import lookie from 'lookie';
import confetti from 'canvas-confetti';

import LearnFooter from 'src/components/LearnFooter';
import Step from 'src/components/Step';
import { Lesson, LessonData } from 'src/types';

interface Props {
  lesson: Lesson;
  data: LessonData[];
}

const LearnPage = ({ data, lesson }: Props) => {
  const lookieKey = `lesson.${lesson.key}`;
  const [step, setStep] = useState(0);
  const [lastStep, setLastStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  let learnErrorTimer;

  const startConfetti = () => {
    confetti({
      particleCount: 400,
      startVelocity: 30,
      gravity: 0.5,
      spread: 350,
      origin: {
        x: 0.5,
        y: 0.4,
      },
    });
  };

  useEffect(() => {
    const { lastStep = 0, currentStep = lastStep } = lookie.get(lookieKey) || {};

    setStep(currentStep);
    setLastStep(lastStep);
    setSuccess(currentStep < lastStep);
  }, [lookieKey]);

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const nextStep = () => {
    if (!success) {
      setError(true);
      clearTimeout(learnErrorTimer);
      learnErrorTimer = setTimeout(() => setError(false), 1000);
      return;
    }

    const nextStep = step + 1;

    if (step < data.length - 1) {
      setError(false);
      setStep(nextStep);
    }

    const { lastStep } = lookie.get(lookieKey);

    if (nextStep === data.length - 1 && lastStep < nextStep) {
      startConfetti();
    }
  };

  const onChangeSuccess = status => setSuccess(status);

  const handleChangeStep = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        prevStep();
      } else {
        nextStep();
      }
    }
  };

  useEventListener('keypress', handleChangeStep);

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
      <Step
        lesson={lesson}
        data={data[step]}
        step={step}
        steps={data}
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
};

export default LearnPage;
