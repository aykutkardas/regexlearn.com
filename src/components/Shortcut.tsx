import cx from 'clsx';

import { isMacOS, isMobile } from 'src/utils/useOS';

interface Props {
  command: string;
  className?: string;
}

const Shortcut = ({ command, className }: Props) => {
  if (isMobile()) return null;

  const altKey = isMacOS() ? '⌥' : 'Alt';

  const readableCommand = command
    .replace(/\+/g, ' + ')
    .replace(/alt/g, altKey)
    .split(' ')
    .map(token =>
      token.length === 1 && /[a-zA-Z]/.test(token) ? token.toLowerCase() : token.toUpperCase(),
    )
    .join(' ');
  return (
    <kbd
      className={cx(
        'hidden md:inline-flex items-center font-mono font-normal tracking-tight whitespace-nowrap',
        'px-1.5 py-0.5 text-[10px] leading-none rounded-md',
        'border border-white/10 border-b-2 bg-white/4 text-neutral-400',
        className,
      )}
    >
      {readableCommand}
    </kbd>
  );
};

export default Shortcut;
