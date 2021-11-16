import Link from "next/link";
import cx from "classnames";

import * as styles from "./LearnHeader.module.css";

import Icon from "../Icon";
import LanguageSwitch from "../LanguageSwitch";
import Progress from "../Progress";

const Header = ({ steps, step }) => (
  <div className={cx(styles.LearnHeader, "container-fluid")}>
    <header className={cx(styles.LearnHeaderRow, "row")}>
      <div className={cx(styles.LearnHeaderHomeWrapper, "col-xs-4")}>
        <Link href="/">
          <a className={styles.LearnHeaderBrand}>
            <Icon
              className={cx(styles.LearnHeaderBrandIcon, "visible-xs visible-sm")}
              icon="unlocked"
              removeInlineStyle
            />
            <img
              className="visible-md visible-lg"
              src="/logo.svg"
              alt="RegexLearn"
            />
          </a>
        </Link>
      </div>
      <div className={cx(styles.LearnHeaderProgressWrapper, "col-xs-4")}>
        <Progress steps={steps} step={step} />
      </div>
      <div className={cx(styles.LearnHeaderLanguageSwitchWrapper, "col-xs-4")}>
        <LanguageSwitch />
      </div>
    </header>
  </div>
);

export default Header;
