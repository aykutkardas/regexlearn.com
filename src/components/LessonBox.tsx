import { Fragment, useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import lookie from 'lookie';
import cx from 'clsx';

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
      <a className="relative hover:outline-8">
        <div
          className={cx(
            'bg-[url(/images/lesson-card-bg.png)] bg-[length:100%_100%] transition-all duration-300 w-full h-48 bg-center rounded-xl py-3 px-4 flex flex-col shadow-xl flex-1 select-none',
            !lock ? 'hover:bg-[length:125%_125%]' : 'cursor-not-allowed text-center grayscale',
          )}
        >
          <h2 className="mb-1 text-lg">
            <FormattedMessage id={data.title} />
          </h2>
          <p className="text-sm text-neutral-400">
            <FormattedMessage id={data.description} />
          </p>
          {!lock && (
            <div className="flex items-end text-sm flex-1 justify-between">
              <span className="inline-flex items-center">
                <Icon icon="files-empty" size={15} className="mr-1" />
                {stepCount}
              </span>
              <span className="inline-flex items-center">
                {startText} <Icon icon="arrow-right" size={14} className="ml-1" />
              </span>
            </div>
          )}
        </div>
      </a>
    </DynamicWrapper>
  );
};

export default LessonBox;
