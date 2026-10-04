import { Fragment, useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import lookie from 'lookie';
import cx from 'clsx';

import IntlLink from 'src/components/IntlLink';
import Icon from 'src/components/Icon';
import { useLanguageDirection } from 'src/utils/useLanguageDirection';

interface Props {
  data: {
    key: string;
    slug: string;
    title: string;
    description: string;
    stepCount: number;
    videoCount?: number;
  };
  accent?: 'green' | 'orange';
  lock?: boolean;
}

const accents = {
  green: {
    card: 'from-[#324A34] to-[#25332a] hover:shadow-regreen-400/10',
    glow: 'bg-regreen-400/20',
    bar: 'from-regreen-400 to-emerald-500',
    text: 'text-regreen-400',
  },
  orange: {
    card: 'from-[#8a561d] to-[#4a3220] hover:shadow-orange-400/10',
    glow: 'bg-orange-400/25',
    bar: 'from-orange-300 to-orange-500',
    text: 'text-orange-300',
  },
};

const LessonBox = ({ data, lock, accent = 'green' }: Props) => {
  const [lastStep, setLastStep] = useState(0);
  const { formatMessage } = useIntl();
  const direction = useLanguageDirection();
  const theme = accents[accent];

  useEffect(() => {
    const lessonData = lookie.get(`lesson.${data.key}`);
    setLastStep(lessonData?.lastStep > 0 ? lessonData.lastStep : 0);
  }, [data.key]);

  const isVisit = lastStep > 0;
  const progress = Math.min(100, Math.round(((lastStep + (isVisit ? 1 : 0)) / data.stepCount) * 100));
  const startText = formatMessage({ id: isVisit ? 'general.continue' : 'general.start' });

  const resetProgress = e => {
    e.preventDefault();
    e.stopPropagation();
    lookie.remove(`lesson.${data.key}`);
    setLastStep(0);
  };

  const arrowDirectionName = direction === 'rtl' ? 'arrow-left' : 'arrow-right';

  const card = (
    <div
      className={cx(
        'group relative overflow-hidden w-full min-h-44 rounded-2xl p-5 flex flex-col select-none',
        'bg-linear-to-br/srgb border border-white/8 shadow-card',
        'transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:shadow-2xl',
        theme.card,
        lock && 'cursor-not-allowed text-center grayscale',
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[url(/images/noise.png)] bg-repeat opacity-60 mix-blend-overlay pointer-events-none"
      />
      <div
        aria-hidden
        className={cx(
          'absolute -top-16 ltr:-right-16 rtl:-left-16 w-48 h-48 rounded-full blur-3xl transition-opacity duration-300 opacity-60 group-hover:opacity-100',
          theme.glow,
        )}
      />

      <div className="relative flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold tracking-tight">
          <FormattedMessage id={data.title} />
        </h2>
        <div className="inline-flex items-center gap-1.5 text-xs text-neutral-300 shrink-0">
          {data.videoCount && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/20">
              <Icon icon="video-camera" size={14} />
              {data.videoCount}
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/20">
            <Icon icon="document-duplicate" size={14} />
            {data.stepCount}
          </span>
        </div>
      </div>
      <p className="relative text-sm text-neutral-300/90 max-w-[85%] mt-2 leading-relaxed">
        <FormattedMessage id={data.description} />
      </p>

      {!lock && (
        <div className="relative flex flex-col flex-1 justify-end gap-3 mt-5">
          {isVisit && (
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-black/30 overflow-hidden">
                <div
                  className={cx('h-full rounded-full bg-linear-to-r/srgb', theme.bar)}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={cx('text-xs font-mono', theme.text)}>{progress}%</span>
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            {isVisit ? (
              <span
                role="button"
                tabIndex={0}
                onClick={resetProgress}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && resetProgress(e)}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-black/20 transition-colors"
              >
                {formatMessage({ id: 'general.resetProgress' })}
              </span>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-1.5 bg-ink-900/80 group-hover:bg-ink-950 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors">
              {startText}
              <Icon
                icon={arrowDirectionName}
                size={13}
                className="transition-transform group-hover:ltr:translate-x-0.5 group-hover:rtl:-translate-x-0.5"
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );

  if (lock) return <Fragment>{card}</Fragment>;

  return (
    <IntlLink
      href={`/[lang]/learn/[lesson]`}
      query={{ lesson: data.slug }}
      className="block rounded-2xl"
    >
      {card}
    </IntlLink>
  );
};

export default LessonBox;
