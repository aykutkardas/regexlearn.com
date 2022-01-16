import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

import * as styles from './CheatsheetItemTitle.module.css';

const CheatsheetItemTitle = ({ data, className }) => {
  return (
    <div className={cx(styles.CheatsheetItemTitle, className)}>
      <span className={styles.CheatsheetItemTitleCodeWrapper}>
        <code className={styles.CheatsheetItemTitleCode}>{data.code}</code>
      </span>
      <div className={styles.CheatsheetItemTitleText}>
        <FormattedMessage id={data.title} />
      </div>
    </div>
  );
};

export default CheatsheetItemTitle;
