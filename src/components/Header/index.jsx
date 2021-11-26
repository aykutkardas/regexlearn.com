import ReactTooltip from 'react-tooltip';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import cx from 'classnames';

import * as styles from './Header.module.css';

import Icon from '../Icon';
import Logo from '../Logo';

const ShortcutSwitch = dynamic(import('../ShortcutSwitch'), { ssr: false });
const LanguageSwitch = dynamic(import('../LanguageSwitch'), { ssr: false });

function Header() {
  const { pathname } = useRouter();

  return (
    <header className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className={styles.Header}>
            <Logo />
            <div className={styles.HeaderNav}>
              <Link href="/learn" passHref>
                <a
                  className={cx(styles.HeaderLink, {
                    [styles.HeaderLinkActive]: pathname === '/learn',
                  })}
                >
                  <FormattedMessage id="general.learn" />
                </a>
              </Link>
              <Link href="/cheatsheet" passHref>
                <a
                  className={cx(styles.HeaderLink, {
                    [styles.HeaderLinkActive]: pathname === '/cheatsheet',
                  })}
                >
                  <FormattedMessage id="general.cheatsheet" />
                </a>
              </Link>
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
              <ShortcutSwitch />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
