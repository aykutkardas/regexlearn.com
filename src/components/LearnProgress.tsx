import clsx from 'clsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Icon from './Icon';
import { InteractiveAreaContext } from 'src/context/InteractiveAreaContext';
import HighlightedText from './HighlightedText';
import { useLanguageDirection } from "src/utils/useLanguageDirection";

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

  const direction = useLanguageDirection();

  // list lesson (ToggleProgress For RTL/LTR)
  const listOpen = direction === 'rtl' ? 'left-0' : 'right-0';
  const listClose = direction === 'rtl' ? 'left-[-244px]' : 'right-[-244px]';
  const listOpenInner = direction === 'rtl' ? '-left-10' : '-right-10';
  const listCloseInner = direction === 'rtl' ? 'left-[204px]' : 'right-[204px]';
  const listIconName = direction === 'rtl' ? 'arrow-right' : 'arrow-left';

  return (
    <div
      className={clsx(
        'hidden lg:block text-xs top-[50%] translate-y-[-50%] absolute z-10 transition-all select-none',
        open ? listOpen : listClose,
      )}
    >
      <div
        ref={learnProgressRef}
        className="hidden-scrollbar scroll-smooth pl-5 bg-ink-900 border border-white/6 rounded-2xl shadow-2xl shadow-black/40 relative w-56 overflow-y-scroll overflow-x-hidden py-10 h-[360px]"
      >
        <div
          onClick={toggleProgress}
          className={clsx(
            direction === 'rtl' ? 'translate-x-[50%]' : 'translate-x-[-50%]',
            `w-10 h-10 cursor-pointer rounded-full  flex fixed top-[50%] transition-all duration-50`,
            open
              ? `${listOpenInner} bg-white/10 hover:bg-white/15`
              : `${listCloseInner} bg-regreen-500 hover:bg-regreen-400/80 shadow-glow-sm`,
          )}
        >
          <Icon
            icon={listIconName}
            size={15}
            className={clsx(
              direction === 'rtl' ? 'ml-auto mr-1' : 'mr-auto ml-1',
              `my-auto text-neutral-100`,
              open ? 'rotate-180' : 'rotate-0',
            )}
          />
        </div>
        <div className="flex h-10 w-72 bg-linear-to-b/srgb pointer-events-none from-ink-900 z-20 to-transparent fixed top-0" />
        <div className="flex h-10 w-72 bg-linear-to-t/srgb pointer-events-none from-ink-900 z-20 to-transparent fixed bottom-0" />
        {lessonData.map((lesson, index) => (
          <div
            key={lesson.title + index}
            className={clsx(
              {
                'active-step text-regreen-400': step === index,
                '': lastStep >= index && step !== index,
              },
              'step-item relative truncate max-w-[80%] flex flex-row-reverse items-center',
              index !== lessonData.length - 1 &&
              `pb-6 after:content-[''] after:block after:w-[2px] after:h-8 after:bg-white/10 after:rounded-md after:mx-[7px] after:top-8 after:absolute`,
            )}
          >
            {step === index && (
              <Icon icon="play" size={16} className={clsx(
                direction === 'ltr' ? 'ml-2' : 'mr-2',
                "text-regreen-400 shrink-0"
              )} />
            )}
            {lastStep >= index && step !== index && (
              <Icon icon="check" size={16} className={clsx(
                direction === 'ltr' ? 'ml-2' : 'mr-2',
                "text-regreen-400 shrink-0"
              )} />
            )}
            {lastStep < index && (
              <Icon icon="lock-closed" size={16} className={clsx(
                direction === 'ltr' ? 'ml-2' : 'mr-2',
                "text-neutral-600 shrink-0"
              )} />
            )}

            <HighlightedText
              element="span"
              className={clsx(
                'truncate py-2 transition-all cursor-pointer',
                index === step
                  ? 'pr-2! text-neutral-50'
                  : 'text-neutral-300 hover:text-neutral-100 pl-0',
              )}
              text={formatMessage({ id: lesson.title }).replace('\\n', '')}
              onClick={() => handleChangeStep(index)}
              attrs={{
                className: clsx(
                  'font-mono text-[10px] px-1 py-0.5 bg-regreen-400/10 rounded-md',
                  step === index ? 'text-regreen-400' : 'text-regreen-500',
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
