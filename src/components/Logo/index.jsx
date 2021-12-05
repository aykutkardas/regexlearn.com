import cx from 'classnames';

import * as styles from './Logo.module.css';

import Icon from 'src/components/Icon';
import IntlLink from 'src/components/IntlLink';

const Logo = () => {
  return (
    <IntlLink href="/">
      <a className={styles.Brand}>
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
};

export default Logo;
