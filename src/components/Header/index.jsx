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
              <IntlLink href="/[lang]/learn" passHref>
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
              <IntlLink href="/[lang]/cheatsheet" passHref>
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
              <IntlLink href="/[lang]/playground" passHref>
                {({ isActive }) => (
                  <a
                    className={cx(styles.HeaderLink, {
                      [styles.HeaderLinkActive]: isActive,
                    })}
                  >
                    <FormattedMessage id="general.playground" />
                  </a>
                )}
              </IntlLink>
              <a
                href="https://github.com/aykutkardas/regexlearn.com"
                target="_blank"
                rel="noreferrer"
                className={cx(styles.HeaderLink, 'visible-md visible-lg')}
              >
                <span>GitHub</span>
                <Icon icon="github" size={16} color="white" />
              </a>
              <LanguageSwitch />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
