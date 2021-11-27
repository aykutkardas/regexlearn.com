import Link from 'next/link';
import cx from 'classnames';

import * as styles from './Logo.module.css';

import Icon from '../Icon';

const Logo = () => {
  return (
    <Link href="/">
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
    </Link>
  );
};

export default Logo;
