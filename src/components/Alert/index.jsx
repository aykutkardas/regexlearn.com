import { useState } from 'react';
import lookie from 'lookie';

import Icon from 'src/components/Icon';
import * as styles from './Alert.module.css';

const Alert = ({ children, ...props }) => {
  const visible = lookie.get('devAlertStatus') !== 'hidden';
  const [isVisible, setVisible] = useState(visible);

  const handleClose = () => {
    setVisible(false);
    lookie.set('devAlertStatus', 'hidden', '1h');
  };

  return (
    isVisible && (
      <div className={styles.Alert} {...props}>
        <div className={styles.AlertContent}>{children}</div>
        <div
          className={styles.AlertClose}
          role="button"
          tabIndex="0"
          onClick={handleClose}
          onKeyDown={handleClose}
        >
          <Icon icon="close" size={10} color="#c4d9cb" />
        </div>
      </div>
    )
  );
};

export default Alert;
