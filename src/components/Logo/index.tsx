import cx from 'classnames';

import Icon from 'src/components/Icon';
import IntlLink from 'src/components/IntlLink';

import styles from './Logo.module.css';

const Logo = () => (
  <IntlLink href="/[lang]">
    <a className={styles.Brand} aria-label="RegexLearn">
      <Icon
        className={cx(styles.BrandIcon, 'visible-xs visible-sm')}
        icon="unlocked"
        removeInlineStyle
        size={20}
      />
      <img
        className="visible-md visible-lg"
        width={109}
        height={27}
        src="/logo.svg"
        alt="RegexLearn"
      />
    </a>
  </IntlLink>
);

export default Logo;
