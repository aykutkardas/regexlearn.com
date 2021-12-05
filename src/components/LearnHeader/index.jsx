import cx from 'classnames';

import * as styles from './LearnHeader.module.css';

import ShortcutSwitch from 'src/components/ShortcutSwitch';
import LanguageSwitch from 'src/components/LanguageSwitch';
import Progress from 'src/components/Progress';
import Logo from 'src/components/Logo';

const Header = ({ steps, step }) => (
  <div className={cx(styles.LearnHeader, 'container-fluid')}>
    <header className={cx(styles.LearnHeaderRow, 'row')}>
      <div className={cx(styles.LearnHeaderHomeWrapper, 'col-xs-4')}>
        <Logo />
      </div>
      <div className={cx(styles.LearnHeaderProgressWrapper, 'col-xs-4')}>
        <Progress total={steps.length - 1} current={step} />
      </div>
      <div className={cx(styles.LearnHeaderLanguageSwitchWrapper, 'col-xs-4')}>
        <ShortcutSwitch />
        <LanguageSwitch />
      </div>
    </header>
  </div>
);

export default Header;
