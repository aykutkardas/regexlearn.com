import ReactTooltip from 'react-tooltip';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

import * as styles from './Header.module.css';

import Icon from 'src/components/Icon';
import Logo from 'src/components/Logo';
import IntlLink from 'src/components/IntlLink';
import LanguageSwitch from 'src/components/LanguageSwitch';

function Header() {
  return (
    <header className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className={styles.Header}>
            <Logo />
            <div className={styles.HeaderNav}>
              <IntlLink href="/learn" passHref>
                {({ isActive }) => (
                  <a
                    className={cx(styles.HeaderLink, {
                      [styles.HeaderLinkActive]: isActive,
                    })}
                  >
                    <FormattedMessage id="general.learn" />
                  </a>
                )}
              </IntlLink>
              <IntlLink href="/cheatsheet" passHref>
                {({ isActive }) => (
                  <a
                    className={cx(styles.HeaderLink, {
                      [styles.HeaderLinkActive]: isActive,
                    })}
                  >
                    <FormattedMessage id="general.cheatsheet" />
                  </a>
                )}
              </IntlLink>
              <span
                className={cx(styles.HeaderLink, styles.HeaderLinkDisabled)}
                data-tip
                data-for="coming-soon"
              >
                <span className="landing-link-disabled-name">
                  <FormattedMessage id="general.playground" />
                </span>
                <Icon icon="lock" size={16} className={styles.HeaderLinkDisabledIcon} />
              </span>
              <a
                href="https://github.com/aykutkardas/regexlearn.com"
                target="_blank"
                rel="noreferrer"
                className={cx(styles.HeaderLink, 'visible-md visible-lg')}
              >
                <span>GitHub</span>
                <Icon icon="github" size={16} color="white" />
              </a>
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
    </header>
  );
}

export default Header;
