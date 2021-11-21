import cx from 'classnames';

import * as styles from './LearnHeader.module.css';

import ShortcutSwitch from '../ShortcutSwitch';
import LanguageSwitch from '../LanguageSwitch';
import Progress from '../Progress';
import Logo from '../Logo';

const Header = ({ steps, step }) => (
  <div className={cx(styles.LearnHeader, 'container-fluid')}>
    <header className={cx(styles.LearnHeaderRow, 'row')}>
      <div className={cx(styles.LearnHeaderHomeWrapper, 'col-xs-4')}>
        <Logo />
      </div>
      <div className={cx(styles.LearnHeaderProgressWrapper, 'col-xs-4')}>
        <Progress steps={steps} step={step} />
      </div>
      <div className={cx(styles.LearnHeaderLanguageSwitchWrapper, 'col-xs-4')}>
        <LanguageSwitch />
        <ShortcutSwitch />
      </div>
    </header>
  </div>
);

export default Header;
