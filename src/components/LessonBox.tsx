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
  bgColor?: string;
  lock?: boolean;
}

const LessonBox = ({ data, lock, bgColor }: Props) => {
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

  useEffect(() => {
    const lessonData = lookie.get(`lesson.${data.key}`);

    if (lessonData && lessonData.lastStep > 0) {
      setIsVisit(true);
    }
  }, [data.key]);

  const startText = formatMessage({ id: isVisit ? 'general.continue' : 'general.start' });

  const direction = useLanguageDirection();
  const arrowDirectionName = direction === 'rtl' ? 'arrow-left' : 'arrow-right';

  return (
    <DynamicWrapper className="hover:outline-8">
      <div
        className={cx(
          'bg-[url(/images/noise.png)] relative bg-repeat bg-contain  transition-all duration-300 w-full h-44 bg-center rounded-xl py-3 px-4 flex flex-col shadow-xl hover:shadow-2xl flex-1 select-none',
          bgColor || 'bg-[#324A34]/80 hover:bg-[#324A34]',
          !lock ? '' : 'cursor-not-allowed text-center grayscale',
        )}
      >
        <h2 className="mb-1 text-lg font-bold">
          <FormattedMessage id={data.title} />
        </h2>
        <p className="text-sm text-neutral-300 max-w-[70%] mt-2">
          <FormattedMessage id={data.description} />
        </p>
        {!lock && (
          <div className="flex items-end text-sm flex-1 justify-between">
            <div className="inline-flex items-center text-sm text-neutral-300 absolute top-5 ltr:right-4 rtl:left-4 space-x-2">
              {data.videoCount && (
                <span className="inline-flex items-center rtl:right-0 ">
                  <Icon icon="video-camera" size={16} className="mx-1" />
                  {data.videoCount}
                </span>
              )}
              <span className="inline-flex items-center ">
                <Icon icon="document-duplicate" size={16}  className="mx-1"/>
                {data.stepCount}
              </span>
            </div>
            <span className="inline-flex items-center rtl:mr-auto ltr:ml-auto bg-neutral-800 px-2 py-1 rounded-md text-xs text-neutral-300 hover:text-neutral-50">
  {startText} <Icon icon={arrowDirectionName} size={14} className="rtl:mr-1 ltr:ml-1" />
</span>


          </div>
        )}
      </div>
    </DynamicWrapper>
  );
};

export default LessonBox;
