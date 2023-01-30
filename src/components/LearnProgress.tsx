import clsx from 'clsx';
import { useContext, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import Icon from './Icon';
import { InteractiveAreaContext } from 'src/context/InteractiveAreaContext';
import HighlightedText from './HighlightedText';

const LearnProgress = () => {
  const learnProgressRef = useRef<HTMLDivElement>(null);
  const { formatMessage } = useIntl();
  const { lessonData, step, setStep, lastStep, resetStep, updateStorage } =
    useContext(InteractiveAreaContext);

  useEffect(() => {
    const activeitem = [...document.querySelectorAll('.step-item')][step];
    if (!activeitem) return;
    const topPos = (activeitem as HTMLDivElement).offsetTop;
    learnProgressRef.current.scrollTop = topPos - 150;
  }, [step]);

  const handleChangeStep = (step: number) => {
    if (step > lastStep) return;

    updateStorage(step);
    resetStep();
    setStep(step);
  };

  return (
    <div className="hidden lg:block text-xs top-[50%] -translate-y-[50%] left-0 absolute pl-5 z-10">
      <div
        ref={learnProgressRef}
        className="hidden-scrollbar scroll-smooth bg-[#282c34] relative w-56 overflow-y-scroll overflow-x-hidden py-10  h-[320px]"
      >
        <div className="flex h-10 w-72 bg-gradient-to-b from-[#282c34] z-20 to-neutral-50/0 fixed top-0" />
        <div className="flex h-10 w-72 bg-gradient-to-t from-[#282c34] z-20 to-neutral-50/0 fixed bottom-0" />
        {lessonData.map((lesson, index) => (
          <div
            key={lesson.title + index}
            className={clsx(
              {
                'active-step text-green-400': step === index,
                'cursor-pointer': lastStep >= index && step !== index,
              },
              'step-item relative truncate max-w-[80%] flex items-center',
              index !== lessonData.length - 1 &&
                "pb-10 after:content-[''] after:block after:w-[2px] after:h-6 after:bg-neutral-700 after:rounded-md after:left-[7px] after:top-6 after:absolute",
            )}
            onClick={() => handleChangeStep(index)}
          >
            {step === index && (
              <Icon icon="play" size={16} className="text-green-400 mr-2 flex-shrink-0" />
            )}
            {lastStep >= index && step !== index && (
              <Icon icon="check" size={16} className="text-green-400 mr-2 flex-shrink-0" />
            )}
            {lastStep < index && (
              <Icon icon="lock-closed" size={16} className="text-neutral-500 mr-2 flex-shrink-0" />
            )}

            <HighlightedText
              element="span"
              className={clsx(
                'truncate transition-all',
                index === step
                  ? '!pl-2 text-neutral-50'
                  : 'text-neutral-300 hover:text-neutral-100 pl-0',
              )}
              text={formatMessage({ id: lesson.title })}
              attrs={{
                className: step === index ? 'text-emerald-400' : 'text-emerald-600',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnProgress;
