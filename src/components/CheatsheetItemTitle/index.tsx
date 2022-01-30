import { MouseEventHandler } from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

import { CheatsheetData } from 'src/types';

import styles from './CheatsheetItemTitle.module.css';

type CheatsheetItemTitleProps = {
  data: CheatsheetData;
  onClick?: MouseEventHandler<Element>;
  className?: string;
};

const CheatsheetItemTitle = ({ data, className, ...props }: CheatsheetItemTitleProps) => (
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
