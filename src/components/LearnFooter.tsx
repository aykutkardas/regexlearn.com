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
    <div className="py-5 flex items-center select-none border-t border-white/[0.05]">
      <div className="w-1/3 flex items-center">
        {step > 0 && (
          <button
            type="button"
            className="group inline-flex items-center gap-2 h-10 ltr:pl-2 ltr:pr-3 rtl:pr-2 rtl:pl-3 rounded-xl text-sm text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors"
            onClick={prevStep}
          >
            <Icon
              icon={prevIconName}
              size={18}
              className="transition-transform ltr:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5"
            />
            <FormattedMessage id="general.prev" />
            <Shortcut command={shortcuts.prevStep} />
          </button>
        )}
      </div>
      <div className="w-1/3 flex items-center justify-center">
        <Social />
      </div>
      <div className="w-1/3 flex items-center justify-end">
        {step < lessonData.length - 1 && (
          <button
            type="button"
            className={cx(
              'group inline-flex items-center gap-2 h-10 ltr:pl-3 ltr:pr-2 rtl:pr-3 rtl:pl-2 rounded-xl text-sm font-medium transition-all duration-200',
              success
                ? 'bg-gradient-to-b from-regreen-400 to-emerald-500 text-ink-950 shadow-glow-sm hover:shadow-glow'
                : 'bg-white/[0.04] border border-white/10 text-neutral-200 hover:bg-white/[0.08]',
            )}
            onClick={nextStep}
          >
            <Icon
              className={cx({
                'text-ink-950': success,
                'text-red-400': error && !success,
                'text-neutral-400': !error && !success,
                'animate__animated animate__shakeY': success,
                'animate__animated animate__shakeX': error,
              })}
              size={16}
              icon={success ? 'lock-open' : 'lock-closed'}
            />
            <FormattedMessage id="general.next" />
            <Shortcut
              command={shortcuts.nextStep}
              className={success ? '!bg-black/10 !border-black/20 !text-ink-950/70' : ''}
            />
            <Icon
              icon={nextIconName}
              size={18}
              className="transition-transform ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default LearnFooter;
