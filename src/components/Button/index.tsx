import cx from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

export enum ButtonVariants {
  Primary = 'primary',
  Github = 'github',
}

const variants = {
  [ButtonVariants.Primary]: styles.Primary,
  [ButtonVariants.Github]: styles.GitHub,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const Button = ({ children, variant, className, ...props }: ButtonProps) => (
  <button className={cx(styles.Button, variants[variant], className)} {...props}>
    {children}
  </button>
);

export default Button;
