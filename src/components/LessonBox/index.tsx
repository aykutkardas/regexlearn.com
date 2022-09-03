import { Fragment, useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import lookie from 'lookie';
import cx from 'classnames';

import IntlLink from 'src/components/IntlLink';
import Icon from 'src/components/Icon';

interface Props {
  data: {
    key: string;
    slug: string;
    title: string;
    description: string;
  };
  lock?: boolean;
}

const LessonBox = ({ data, lock }: Props) => {
  const [isVisit, setIsVisit] = useState(false);
  const { formatMessage } = useIntl();

  let DynamicWrapper;

  if (lock) {
    DynamicWrapper = Fragment;
  } else {
    const WrapperLessonBox = ({ children }) => (
      <IntlLink href={`/[lang]/learn/[lesson]`} query={{ lesson: data.slug }}>
        {children}
      </IntlLink>
    );
    DynamicWrapper = WrapperLessonBox;
  }

  let stepCount = 0;

  if (data.key) {
    stepCount = require(`src/data/lessons/${data.key}.js`)?.default?.length || 0;
  }

  useEffect(() => {
    const lessonData = lookie.get(`lesson.${data.key}`);

    setIsVisit(!!lessonData);
  }, [data.key]);

  const startText = formatMessage({ id: isVisit ? 'general.continue' : 'general.start' });

  return (
    <DynamicWrapper>
      <a className="tw-relative hover:tw-outline-8">
        <div
          className={cx(
            'tw-bg-[url(/images/lesson-card-bg.png)] tw-bg-[length:100%_100%] tw-transition-all tw-duration-300 tw-w-full tw-h-48 tw-bg-center tw-rounded-xl tw-py-3 tw-px-4 tw-flex tw-flex-col tw-shadow-xl tw-flex-1 tw-select-none',
            !lock
              ? 'hover:tw-bg-[length:125%_125%]'
              : 'tw-cursor-not-allowed tw-text-center tw-grayscale',
          )}
        >
          <h2 className="tw-mb-1 tw-text-lg">
            <FormattedMessage id={data.title} />
          </h2>
          <p className="tw-text-sm dark:tw-text-neutral-400">
            <FormattedMessage id={data.description} />
          </p>
          {!lock && (
            <div className="tw-flex tw-items-end tw-text-sm tw-flex-1 tw-justify-between">
              <span className="tw-inline-flex tw-items-center">
                <Icon icon="files-empty" size={15} className="tw-mr-1" />
                {stepCount}
              </span>
              <span className="tw-inline-flex tw-items-center">
                {startText} <Icon icon="arrow-right" size={14} className="tw-ml-1" />
              </span>
            </div>
          )}
        </div>
      </a>
    </DynamicWrapper>
  );
};

export default LessonBox;
