import React, { useEffect, useState } from 'react';
import useEventListener from '@use-it/event-listener';
import { GetStaticPaths, GetStaticProps } from 'next';
import lookie from 'lookie';
import confetti from 'canvas-confetti';

import Header from 'src/components/Header';
import CustomHead from 'src/components/CustomHead';
import LearnFooter from 'src/components/LearnFooter';
import Step from 'src/components/Step';
import { defaultLocale, locales } from 'src/localization';
import lessons from 'src/data/lessons/index.json';
import { Lesson } from 'src/types';

type PageLessonProps = {
  lesson: Lesson;
};

const PageLesson = ({ lesson }: PageLessonProps) => {
  const data = require(`src/data/lessons/${lesson.key}.js`)?.default;

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
      <CustomHead
        title={`lessons.${lesson.key}.title`}
        description={`lessons.${lesson.key}.description`}
        hrefLang={`learn/${lesson.slug}`}
      >
        <link rel="stylesheet" href="/css/animate.css" />
      </CustomHead>
      <Header isLearnPage />
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

export default PageLesson;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;
  const lesson = lessons.find(({ slug }) => slug === params.lesson);

  return {
    props: {
      lang,
      messages,
      lesson,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];

  locales.forEach(lang => {
    lessons.forEach(lesson => {
      paths.push({
        params: {
          lang,
          lesson: lesson.slug,
        },
      });
    });
  });

  return {
    fallback: false,
    paths,
  };
};
