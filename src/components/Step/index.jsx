import { useIntl } from "react-intl";

import * as styles from "./Step.module.css";

import InteractiveArea from "../InteractiveArea";

import tagWrapper from "../../utils/tagWrapper";


function Steps({ data, step, error: parentError, onChangeSuccess }) {
  const { formatMessage } = useIntl();

  const title = tagWrapper(
    formatMessage({ id: data.title }),
    /`(\S*?[^`]*)`/gim,
    "step-word"
  ).replace(/\\n/gim, "<br/>");

  const description = tagWrapper(
    formatMessage({ id: data.description }),
    /`(\S*?[^`]*)`/gim,
    "step-word"
  ).replace(/\\n/gim, "<br/>");

  const isInteractive = data.interactive !== false;

  return (
    <div className={styles.Step}>
      <h4 className={styles.StepTitleOriginal}>{data.originalTitle}</h4>
      <h2
        className={styles.StepTitle}
        dangerouslySetInnerHTML={{ __html: title }}
        data-original-title={data.originalTitle}
      />
      <p
        className={styles.StepDescription}
        dangerouslySetInnerHTML={{ __html: description }}
      />
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
