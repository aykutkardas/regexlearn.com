import { Fragment, useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import lookie from 'lookie';
import cx from 'classnames';

import IntlLink from 'src/components/IntlLink';
import Icon from 'src/components/Icon';

import styles from './LessonBox.module.css';

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
      <a className={cx(styles.LessonBox, { [styles.LessonBoxLock]: lock })}>
        <div className={styles.LessonBoxDetail}>
          <h2 className={styles.LessonBoxTitle}>
            <FormattedMessage id={data.title} />
          </h2>
          <p className={styles.LessonBoxDescription}>
            <FormattedMessage id={data.description} />
          </p>
          {!lock && (
            <div className={styles.LessonBoxStats}>
              <div className={styles.LessonBoxStatsInfo}>
                <span>
                  <Icon icon="files-empty" size={15} />
                  {stepCount}
                </span>
              </div>
              <span className={styles.LessonBoxAction}>
                {startText} <Icon icon="arrow-right" size={14} />
              </span>
            </div>
          )}
        </div>
      </a>
    </DynamicWrapper>
  );
};

export default LessonBox;
