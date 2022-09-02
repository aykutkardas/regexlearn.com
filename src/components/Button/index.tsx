import cx from 'classnames';
import { ButtonHTMLAttributes } from 'react';

export enum ButtonVariants {
  Primary = 'primary',
}

const variants = {
  [ButtonVariants.Primary]: 'dark:tw-bg-primary dark:hover:tw-bg-green-700 dark:tw-text-white',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const Button = ({ children, variant, className, ...props }: ButtonProps) => (
  <button
    className={cx(
      'tw-px-4 tw-py-3 tw-rounded-md disabled:tw-cursor-not-allowed tw-text-sm',
      variants[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
