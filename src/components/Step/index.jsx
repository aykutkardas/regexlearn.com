import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import InteractiveArea from 'src/components/InteractiveArea';
import Progress from 'src/components/Progress';

import tagWrapper from 'src/utils/tagWrapper';

import * as styles from './Step.module.css';

function Step({ lessonName, data, step, steps, error: parentError, onChangeSuccess }) {
  const { formatMessage } = useIntl();
  const [mounted, setMounted] = useState();

  const title = tagWrapper({
    value: formatMessage({ id: data.title }),
    regex: /`(\S*?[^`]*)`/gim,
    attributes: { class: styles.StepTitleWord },
  }).replace(/\\n/gim, '<br/>');

  const description = tagWrapper({
    value: formatMessage({ id: data.description }),
    regex: /`(\S*?[^`]*)`/gim,
    attributes: { class: styles.StepDescriptionWord },
  }).replace(/\\n/gim, '<br/>');

  useEffect(() => {
    setMounted(true);
  }, []);

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
        lessonName={lessonName}
        isShow={isInteractive}
        data={data}
        step={step}
        parentError={parentError}
        onChangeSuccess={onChangeSuccess}
      />
      {mounted &&
        ReactDOM.createPortal(
          <Progress total={steps.length} current={step + 1} />,
          window.document.getElementById('ProgressArea'),
        )}
    </div>
  );
}

export default Step;
