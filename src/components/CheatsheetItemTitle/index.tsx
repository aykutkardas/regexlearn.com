import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

import styles from './CheatsheetItemTitle.module.css';
import { MouseEventHandler } from 'react';

type CheatsheetItemTitleProps = {
  data: {
    title: string;
    code: string;
  };
  onClick?: MouseEventHandler<Element>;
  className?: string;
};

const CheatsheetItemTitle: React.FC<CheatsheetItemTitleProps> = ({ data, className, ...props }) => (
  <div {...props} className={cx(styles.CheatsheetItemTitle, className)}>
    <span className={styles.CheatsheetItemTitleCodeWrapper}>
      <code className={styles.CheatsheetItemTitleCode}>{data.code}</code>
    </span>
    <div className={styles.CheatsheetItemTitleText}>
      <FormattedMessage id={data.title} />
    </div>
  </div>
);

export default CheatsheetItemTitle;
