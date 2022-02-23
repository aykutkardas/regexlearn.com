import cx from 'classnames';

import styles from './Button.module.css';

const variants = {
  primary: styles.Primary,
  github: styles.GitHub,
};

interface Props {
  variant: 'primary' | 'github';
  className?: string;
  children: any;
}

const Button = ({ children, variant, className, ...props }: Props) => (
  <button className={cx(styles.Button, variants[variant], className)} {...props}>
    {children}
  </button>
);

export default Button;
