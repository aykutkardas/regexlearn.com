import cx from 'classnames';

import * as styles from './Button.module.css';

const variants = {
  primary: styles.Primary,
  github: styles.GitHub,
};

const Button = ({ children, variant, className, ...props }) => (
  <button className={cx(styles.Button, variants[variant], className)} type="button" {...props}>
    {children}
  </button>
);

export default Button;
