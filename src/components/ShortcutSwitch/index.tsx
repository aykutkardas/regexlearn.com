import lookie from 'lookie';
import { useEffect, useState } from 'react';
import cx from 'classnames';

import Icon from 'src/components/Icon';

import styles from './ShortcutSwitch.module.css';

const ShortcutSwitch = () => {
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    setHidden(lookie.get('shortcutHidden'));
  }, []);

  const toggle = () => {
    setHidden(!hidden);
    lookie.set('shortcutHidden', !hidden);
  };

  useEffect(() => {
    if (hidden) {
      document.body.classList.add('shortcutHidden');
    } else {
      document.body.classList.remove('shortcutHidden');
    }
  }, [hidden]);

  const className = hidden ? styles.ShortcutSwitchDisable : styles.ShortcutSwitch;

  return (
    <Icon
      onClick={toggle}
      className={cx(className, 'visible-md visible-lg')}
      icon="keyboard"
      size={20}
    />
  );
};

export default ShortcutSwitch;
