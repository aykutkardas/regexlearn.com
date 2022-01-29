import cx from 'classnames';

import styles from './Button.module.css';

const variants = {
  primary: styles.Primary,
  github: styles.GitHub,
};

type ButtonProps = {
  variant: 'primary' | 'github';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, variant, className, ...props }) => (
  <button className={cx(styles.Button, variants[variant], className)} {...props}>
    {children}
  </button>
);

export default Button;
