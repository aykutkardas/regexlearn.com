import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import dynamic from 'next/dynamic';

const Shortcut = dynamic(import('src/components/Shortcut'), { ssr: false });
import Icon from 'src/components/Icon';
import Social from 'src/components/Social';
import shortcuts from 'src/shortcuts';
import { InteractiveAreaContext } from 'src/context/InteractiveAreaContext';

const LearnFooter = () => {
  const { lessonData, step, nextStep, prevStep, success, error } =
    useContext(InteractiveAreaContext);

  return (
    <div className="tw-full tw-px-3 tw-mb-5 tw-flex tw-select-none">
      <div className="tw-w-1/3 tw-h-full tw-flex tw-items-end">
        {step > 0 && (
          <div
            className="tw-mr-auto tw-items-end tw-text-left tw-flex tw-flex-col hover:tw-opacity-60"
            role="button"
            tabIndex={0}
            onClick={prevStep}
          >
            <Shortcut command={shortcuts.prevStep} />
            <div className="tw-inline-flex tw-items-center">
              <Icon className="tw-mr-1" icon="arrow-left" size={20} />
              <FormattedMessage id="general.prev" />
            </div>
          </div>
        )}
      </div>
      <div className="tw-w-1/3 tw-h-full tw-flex tw-items-end tw-justify-center">
        <Social />
      </div>
      <div className="tw-w-1/3 tw-h-full tw-flex tw-items-end">
        {step < lessonData.length - 1 && (
          <div
            className="tw-ml-auto tw-flex tw-flex-col tw-items-start tw-text-right hover:tw-opacity-60"
            role="button"
            tabIndex={0}
            onClick={nextStep}
          >
            <div>
              <Shortcut command={shortcuts.nextStep} />
              <Icon
                className={cx('tw-ml-1', {
                  'tw-text-green-400': success,
                  'tw-text-red-400': error,
                  'animate__animated animate__shakeY': success,
                  'animate__animated animate__shakeX': error,
                })}
                size={20}
                icon={success ? 'unlocked' : 'lock'}
              />
            </div>
            <div className="tw-inline-flex tw-items-center tw-ml-auto">
              <FormattedMessage id="general.next" />
              <Icon className="tw-ml-1" icon="arrow-right" size={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnFooter;
