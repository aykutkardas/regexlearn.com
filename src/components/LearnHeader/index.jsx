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
        <div className="header-social">
          <Link href="/" passHref>
            <a>
              <Icon icon="home" size={20} color="white" />
            </a>
          </Link>
        </div>
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
