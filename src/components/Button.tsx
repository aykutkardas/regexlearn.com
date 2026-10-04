import { ButtonHTMLAttributes } from 'react';
import cx from 'clsx';

export enum ButtonVariants {
  Primary = 'primary',
  Secondary = 'secondary',
}

const variants = {
  [ButtonVariants.Primary]: cx(
    'bg-linear-to-b/srgb from-regreen-400 to-emerald-500 text-ink-950 font-semibold',
    'shadow-glow-sm hover:shadow-glow hover:brightness-110',
    'disabled:opacity-50 disabled:hover:brightness-100 disabled:shadow-none',
  ),
  [ButtonVariants.Secondary]: cx(
    'bg-white/4 text-neutral-100 font-medium border border-white/10',
    'hover:bg-white/8 hover:border-white/20',
  ),
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const Button = ({ children, variant, className, ...props }: ButtonProps) => (
  <button
    className={cx(
      'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm',
      'transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed',
      variants[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
