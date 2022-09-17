import { isMacOS, isMobile } from 'src/utils/useOS';

interface Props {
  command: string;
}

const Shortcut = ({ command }: Props) => {
  if (isMobile()) return null;

  const altKey = isMacOS() ? '⌥' : 'Alt';
  const ctrlKey = !isMacOS() ? 'Cmd' : 'Ctrl';

  const readableCommand = command
    .replace(/\+/g, ' + ')
    .replace(/alt/g, altKey)
    .replace(/ctrl/g, ctrlKey)
    .toUpperCase();

  return (
    <div
      role="button"
      className="hidden font-[arial] tracking-tighter  md:inline-flex px-2 py-1 border-b-2 border-neutral-600  m-1 text-[9px] bg-neutral-500/20 rounded-md text-neutral-400"
    >
      {readableCommand}
    </div>
  );
};

export default Shortcut;
