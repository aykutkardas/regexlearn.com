import { useIntl } from 'react-intl';

import * as styles from './Step.module.css';

import InteractiveArea from 'src/components/InteractiveArea';

import tagWrapper from 'src/utils/tagWrapper';

function Steps({ data, step, error: parentError, onChangeSuccess }) {
  const { formatMessage } = useIntl();

  const title = tagWrapper(
    formatMessage({ id: data.title }),
    /`(\S*?[^`]*)`/gim,
    styles.StepTitleWord,
  ).replace(/\\n/gim, '<br/>');

  const description = tagWrapper(
    formatMessage({ id: data.description }),
    /`(\S*?[^`]*)`/gim,
    styles.StepDescriptionWord,
  ).replace(/\\n/gim, '<br/>');

  const isInteractive = data.interactive !== false;

  return (
    <div className={styles.Step}>
      {data.image && <img className={styles.StepImage} src={data.image} alt="" width="100px" />}
      {data.originalTitle && <h4 className={styles.StepTitleOriginal}>{data.originalTitle}</h4>}
      <h2
        className={styles.StepTitle}
        dangerouslySetInnerHTML={{ __html: title }}
        data-original-title={data.originalTitle}
      />
      <p className={styles.StepDescription} dangerouslySetInnerHTML={{ __html: description }} />
      <InteractiveArea
        isShow={isInteractive}
        data={data}
        step={step}
        parentError={parentError}
        onChangeSuccess={onChangeSuccess}
      />
    </div>
  );
}

export default Steps;
