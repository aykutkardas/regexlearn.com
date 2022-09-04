import cx from 'classnames';

import useOS from 'src/utils/useOS';

interface Props {
  command: string;
}

const Shortcut = ({ command }: Props) => {
  const { isMacOS, isDesktop } = useOS();

  if (!isDesktop) return null;

  const readableCommand = command
    .replace(/\+/g, ' + ')
    .replace(/alt/g, isMacOS ? 'option' : 'alt')
    .toUpperCase();

  return (
    <div
      role="button"
      className="hidden md:inline-flex p-1 m-1 text-[9px] bg-neutral-500/20 rounded-sm text-neutral-400"
    >
      {readableCommand}
    </div>
  );
};

export default Shortcut;
