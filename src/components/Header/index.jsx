/* eslint-disable @next/next/no-img-element */
import ReactTooltip from "react-tooltip";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import cx from "classnames";

import * as styles from "./Header.module.css";

import Icon from "../Icon";

const LanguageSwitch  = dynamic(import("../LanguageSwitch"), { ssr: false });

function Header() {
  const { pathname } = useRouter();

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className={styles.Header}>
            <Link href="/">
              <a className={styles.HeaderBrand}>
                <Icon
                  className={cx(styles.HeaderBrandIcon, "visible-xs visible-sm")}
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

            <div className={styles.HeaderNav}>
              <Link href="/learn" passHref>
                <a className={cx(styles.HeaderLink, { [styles.HeaderLinkActive]: pathname === "/learn"})}>
                  <FormattedMessage id="landing.learn" />
                </a>
              </Link>
              <Link href="/cheatsheet" passHref>
                <a className={cx(styles.HeaderLink, { [styles.HeaderLinkActive]: pathname === "/cheatsheet"})}>
                  <FormattedMessage id="landing.cheatsheet" />
                </a>
              </Link>
              <span
                className={cx(styles.HeaderLink, styles.HeaderLinkDisabled)}
                data-tip
                data-for="coming-soon"
              >
                <span className="landing-link-disabled-name">
                  <FormattedMessage id="landing.playground" />
                </span>
                <Icon
                  icon="lock"
                  size={16}
                  className={styles.HeaderLinkDisabledIcon}
                />
              </span>
              <ReactTooltip
                  backgroundColor="#444"
                  arrowColor="#444"
                  clickable
                  id="coming-soon"
                  place="bottom"
                  effect="solid"
                >
                  <FormattedMessage id="general.comingSoon" />
                </ReactTooltip>
              <LanguageSwitch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
