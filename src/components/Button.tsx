import { ButtonHTMLAttributes } from 'react';
import cx from 'clsx';

export enum ButtonVariants {
  Primary = 'primary',
}

const variants = {
  [ButtonVariants.Primary]:
    'bg-regreen-500 hover:bg-regreen-600 text-white disabled:opacity-50 disabled:hover:bg-regreen-500',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const Button = ({ children, variant, className, ...props }: ButtonProps) => (
  <button
    className={cx(
      'px-4 py-3 rounded-lg disabled:cursor-not-allowed text-sm',
      variants[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
