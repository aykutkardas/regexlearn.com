import { Line } from "rc-progress";

import * as styles from "./Progress.module.css";

const Progress = ({ steps, step }) => {
  const percent = (step / steps.length) * 100;

  return (
    <div className={styles.Progress}>
      <Line
        percent={percent}
        className={styles.ProgressLine}
        strokeWidth="4"
      />
      <div className={styles.ProgressStatus}>
        {`${step} / ${steps.length - 1}`}
      </div>
    </div>
  );
};

export default Progress;
