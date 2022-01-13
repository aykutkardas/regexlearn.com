import { Fragment, useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import IntlLink from '../IntlLink';
import Icon from '../Icon';
import * as styles from './LessonBox.module.css';
import cx from 'classnames';
import lookie from 'lookie';

const LessonBox = ({ data, lock }) => {
  const Wrapper = lock ? Fragment : IntlLink;
  const props = lock ? {} : { href: `/[lang]/learn/[lesson]`, query: { lesson: data.key } };

  const stepCount = require(`src/data/lessons/${data.key}.js`)?.default?.length || 0;

  const { formatMessage } = useIntl();

  const [isVisit, setIsVisit] = useState();

  useEffect(() => {
    const lessonData = lookie.get(`lesson.${data.key}`);

    setIsVisit(!!lessonData);
  }, [data.key]);

  const startText = formatMessage({ id: isVisit ? 'general.continue' : 'general.start' });

  return (
    <Wrapper {...props}>
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
    </Wrapper>
  );
};

export default LessonBox;
