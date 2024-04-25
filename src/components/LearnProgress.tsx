import clsx from 'clsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Icon from './Icon';
import { InteractiveAreaContext } from 'src/context/InteractiveAreaContext';
import HighlightedText from './HighlightedText';

const LearnProgress = () => {
  const [open, setOpen] = useState(false);
  const learnProgressRef = useRef<HTMLDivElement>(null);
  const { formatMessage } = useIntl();
  const { lessonData, step, setStep, lastStep, updateStorage } = useContext(InteractiveAreaContext);

  useEffect(() => {
    const activeitem = [...document.querySelectorAll('.step-item')][step];
    if (!activeitem) return;
    const topPos = (activeitem as HTMLDivElement).offsetTop;
    learnProgressRef.current.scrollTop = topPos - 153;
  }, [step]);

  const handleChangeStep = (step: number) => {
    if (step > lastStep) return;

    updateStorage(step);
    setStep(step);
  };

  const toggleProgress = () => setOpen(!open);

  return (
    <div
      className={clsx(
        'hidden lg:block text-xs top-[50%] -translate-y-[50%] absolute z-10 transition-all select-none',
        open ? 'right-0 ' : '-right-[244px]',
      )}
    >
      <div
        ref={learnProgressRef}
        className="hidden-scrollbar scroll-smooth pl-5 bg-[#282c34] rounded-2xl shadow-2xl shadow-[#282c34] relative w-56 overflow-y-scroll overflow-x-hidden py-10  h-[320px]"
      >
        <div
          onClick={toggleProgress}
          className={clsx(
            'w-10 h-10 cursor-pointer rounded-full  flex fixed top-[50%] -translate-x-[50%] -translate-y-[50%] transition-all duration-50',
            open ? '-right-10 bg-neutral-600/40' : 'right-[204px] bg-emerald-600',
          )}
        >
          <Icon
            icon="arrow-left"
            size={15}
            className={clsx(
              'mr-auto my-auto ml-1 text-neutral-100',
              open ? 'rotate-180' : 'rotate-0',
            )}
          />
        </div>
        <div className="flex h-10 w-72 bg-gradient-to-b pointer-events-none from-[#282c34] z-20 to-neutral-50/0 fixed top-0" />
        <div className="flex h-10 w-72 bg-gradient-to-t pointer-events-none from-[#282c34] z-20 to-neutral-50/0 fixed bottom-0" />
        {lessonData.map((lesson, index) => (
          <div
            key={lesson.title + index}
            className={clsx(
              {
                'active-step text-green-400': step === index,
                '': lastStep >= index && step !== index,
              },
              'step-item relative truncate max-w-[80%] flex flex-row-reverse items-center',
              index !== lessonData.length - 1 &&
                "pb-6 after:content-[''] after:block after:w-[2px] after:h-8 after:bg-neutral-700 after:rounded-md after:right-[7px] after:top-8 after:absolute",
            )}
          >
            {step === index && (
              <Icon icon="play" size={16} className="text-green-400 ml-2 flex-shrink-0" />
            )}
            {lastStep >= index && step !== index && (
              <Icon icon="check" size={16} className="text-green-400 ml-2 flex-shrink-0" />
            )}
            {lastStep < index && (
              <Icon icon="lock-closed" size={16} className="text-neutral-500 ml-2 flex-shrink-0" />
            )}

            <HighlightedText
              element="span"
              className={clsx(
                'truncate py-2 transition-all cursor-pointer',
                index === step
                  ? '!pr-2 text-neutral-50'
                  : 'text-neutral-300 hover:text-neutral-100 pl-0',
              )}
              text={formatMessage({ id: lesson.title })}
              onClick={() => handleChangeStep(index)}
              attrs={{
                className: clsx(
                  ' text-[10px] p-1 bg-emerald-400/20 rounded-lg',
                  step === index ? 'text-emerald-400' : 'text-emerald-600',
                ),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnProgress;
