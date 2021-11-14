import { FormattedMessage } from "react-intl";

import * as styles from "./CheatsheetItemTitle.module.css";

const CheatsheetItemTitle = ({ data }) => {
  return (
    <div className={styles.CheatsheetItemTitle}>
      <span className={styles.CheatsheetItemTitleCodeWrapper}>
        <code  className={styles.CheatsheetItemTitleCode}>{data.code}</code>
      </span>
      <div className={styles.CheatsheetItemTitleText}>
        <FormattedMessage id={data.title} />
      </div>
    </div>
  )
}
  
export default CheatsheetItemTitle;
