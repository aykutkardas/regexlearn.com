import cx from 'classnames';

import useOS from 'src/utils/useOS';

import styles from './Shortcut.module.css';

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
    <div role="button" className={cx(styles.Shortcut, 'visible-md visible-lg')}>
      {readableCommand}
    </div>
  );
};

export default Shortcut;
