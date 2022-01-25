import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import dynamic from 'next/dynamic';

import * as styles from './Header.module.css';

import Icon from 'src/components/Icon';
import Logo from 'src/components/Logo';
import IntlLink from 'src/components/IntlLink';
import LanguageSwitch from 'src/components/LanguageSwitch';

const ShortcutSwitch = dynamic(import('src/components/ShortcutSwitch'), { ssr: false });

function Header({ isLearnPage }) {
  return (
    <header
      className={cx({
        container: !isLearnPage,
        'container-fluid': isLearnPage,
      })}
    >
      <div className="row">
        <div className="col-sm-12">
          <div className={styles.Header}>
            <div className={styles.HeaderArea}>
              <Logo />
            </div>
            {isLearnPage && (
              <div id="ProgressArea" className={cx(styles.HeaderArea, styles.ProgressArea)} />
            )}
            <div className={styles.HeaderArea}>
              <div className={styles.HeaderNav}>
                <IntlLink href="/[lang]/learn" passHref>
                  {({ isActive }) => (
                    <a
                      className={cx(styles.HeaderLink, {
                        [styles.HeaderLinkActive]: isActive,
                        'visible-sm visible-md visible-lg': isLearnPage,
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
                        'visible-md visible-lg': isLearnPage,
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
                        'visible-md visible-lg': isLearnPage,
                      })}
                      data-beta="true"
                    >
                      <FormattedMessage id="general.playground" />
                    </a>
                  )}
                </IntlLink>

                <a
                  href="https://github.com/aykutkardas/regexlearn.com"
                  target="_blank"
                  rel="noreferrer"
                  className={cx(styles.HeaderLink, {
                    hidden: isLearnPage,
                    'visible-md visible-lg': !isLearnPage,
                  })}
                >
                  <span>GitHub</span>
                  <Icon icon="github" size={16} color="white" />
                </a>
                {isLearnPage && <ShortcutSwitch />}
                <LanguageSwitch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
