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
      className="tw-hidden md:tw-inline-flex tw-p-1 tw-m-1 tw-text-[9px] dark:tw-bg-neutral-500/20 tw-rounded-sm dark:tw-text-neutral-400"
    >
      {readableCommand}
    </div>
  );
};

export default Shortcut;
