import * as styles from './Progress.module.css';

const Progress = ({ current, total, showProgressText = true }) => {
  const percent = Math.round((current / total) * 100);

  return (
    <div className={styles.Progress}>
      <div className={styles.ProgressBar}>
        <div className={styles.ProgressLine} style={{ width: `${percent}%` }} />
      </div>
      {showProgressText && <div className={styles.ProgressStatus}>{`${current} / ${total}`}</div>}
    </div>
  );
};

export default Progress;
