import { isMacOS, isMobile } from 'src/utils/useOS';

interface Props {
  command: string;
}

const Shortcut = ({ command }: Props) => {
  if (isMobile()) return null;

  const altKey = isMacOS() ? '⌥' : 'Alt';

  const readableCommand = command.replace(/\+/g, ' + ').replace(/alt/g, altKey).toUpperCase();

  return (
    <div
      role="button"
      className="hidden tracking-tighter md:inline-flex p-1 border-b-2 border-neutral-600 m-1 text-[9px] bg-neutral-500/20 rounded-md text-neutral-400"
    >
      {readableCommand}
    </div>
  );
};

export default Shortcut;
