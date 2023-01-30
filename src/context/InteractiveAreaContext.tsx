import { useState, createContext, useEffect } from 'react';
import lookie from 'lookie';

import { Lesson, LessonData } from 'src/types';

interface IInteractiveAreaContext {
  step: number;
  setStep: (step: number) => void;
  lastStep: number;
  setLastStep: (lastStep: number) => void;
  success: boolean;
  setSuccess: (success: boolean) => void;
  match: boolean;
  setMatch: (match: boolean) => void;
  error: boolean;
  setError: (error: boolean) => void;
  lockError: boolean;
  setLockError: (lockError: boolean) => void;
  prevStep: () => void;
  nextStep: () => void;
  updateStorage: (step: number) => void;
  lesson: Lesson;
  lessonData: LessonData[];
  data: LessonData;
}

const InteractiveAreaContext = createContext<IInteractiveAreaContext>({
  step: 0,
  setStep: () => {},
  lastStep: 0,
  setLastStep: () => {},
  success: false,
  setSuccess: () => {},
  error: false,
  setError: () => {},
  lockError: false,
  setLockError: () => {},
  match: false,
  setMatch: () => {},
  prevStep: () => {},
  nextStep: () => {},
  updateStorage: () => {},
  lesson: null,
  lessonData: [],
  data: null,
});

const InteractiveAreaProvider = ({ lesson, lessonData, children }) => {
  const lookieKey = `lesson.${lesson.key}`;

  const [step, setStep] = useState(0);
  const [lastStep, setLastStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [match, setMatch] = useState(false);
  const [error, setError] = useState(false);
  const [lockError, setLockError] = useState(false);

  const data = lessonData[step];

  useEffect(() => {
    const { lastStep = 0, currentStep = lastStep } = lookie.get(lookieKey) || {};

    setStep(currentStep);
    setLastStep(lastStep);
    setSuccess(currentStep < lastStep || data.readOnly || data.interactive === false);
  }, [lookieKey, data]);

  const updateStorage = currentStep => {
    lookie.set(lookieKey, {
      currentStep,
      lastStep: currentStep > lastStep ? currentStep : lastStep,
    });
  };

  const prevStep = () => {
    const prevStep = step - 1;
    if (prevStep > -1) {
      setStep(prevStep);
      setSuccess(lastStep > prevStep);
      setError(false);
      setLockError(false);
      setMatch(false);
      updateStorage(prevStep);
    }
  };

  let learnErrorTimer;

  const nextStep = () => {
    if (!success) {
      setError(true);
      setLockError(true);
      clearTimeout(learnErrorTimer);
      learnErrorTimer = setTimeout(() => setLockError(false), 1000);
      return;
    }

    const nextStep = step + 1;

    if (step < lessonData.length - 1) {
      setError(false);
      setSuccess(lastStep > nextStep);
      setLockError(false);
      setMatch(false);
      setStep(nextStep);
      updateStorage(nextStep);
    }
  };

  return (
    <InteractiveAreaContext.Provider
      value={{
        step,
        setStep,
        lastStep,
        setLastStep,
        success,
        setSuccess,
        match,
        setMatch,
        error,
        setError,
        lockError,
        setLockError,
        prevStep,
        nextStep,
        updateStorage,
        lesson,
        lessonData,
        data,
      }}
    >
      {children}
    </InteractiveAreaContext.Provider>
  );
};

export { InteractiveAreaContext, InteractiveAreaProvider };
