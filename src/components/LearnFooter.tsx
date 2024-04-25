import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'clsx';
import dynamic from 'next/dynamic';

const Shortcut = dynamic(import('src/components/Shortcut'), { ssr: false });
import Icon from 'src/components/Icon';
import Social from 'src/components/Social';
import shortcuts from 'src/shortcuts';
import { InteractiveAreaContext } from 'src/context/InteractiveAreaContext';
import { useLanguageDirection } from 'src/utils/useLanguageDirection';

const LearnFooter = () => {
  const { lessonData, step, nextStep, prevStep, success, error } =
    useContext(InteractiveAreaContext);

  const direction = useLanguageDirection();

  const nextIconName = direction === 'rtl' ? 'arrow-left' : 'arrow-right';
  const prevIconName = direction === 'rtl' ? 'arrow-right' : 'arrow-left';

  return (
    <div className="my-5 flex select-none">
      <div className="w-1/3 h-full flex items-end">
        {step > 0 && (
          <div
            className="rtl:left-0 ltr:right-0 items-end text-left flex flex-col hover:opacity-60"
            role="button"
            tabIndex={0}
            onClick={prevStep}
          >
            <Shortcut command={shortcuts.prevStep} />
            <div className="inline-flex items-center">
              <Icon className="mr-1" icon={prevIconName} size={20} />
              <FormattedMessage id="general.prev" />
            </div>
          </div>
        )}
      </div>
      <div className="w-1/3 h-full flex items-end justify-center">
        <Social />
      </div>
      <div className="w-1/3 h-full flex items-end justify-end text-right">
        {step < lessonData.length - 1 && (
          <div
            className="rtl:right-0 ltr:left-0 items-start text-right flex flex-col hover:opacity-60"
            role="button"
            tabIndex={0}
            onClick={nextStep}
          >
            <div>
              <Shortcut command={shortcuts.nextStep} />
              <Icon
                className={cx('ml-1', {
                  'text-regreen-400': success,
                  'text-red-400': error,
                  'animate__animated animate__shakeY': success,
                  'animate__animated animate__shakeX': error,
                })}
                size={20}
                icon={success ? 'lock-open' : 'lock-closed'}
              />
            </div>
            <div className="inline-flex items-center ml-auto">
              <FormattedMessage id="general.next" />
              <Icon className="ml-1" icon={nextIconName} size={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnFooter;
