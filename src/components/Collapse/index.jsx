import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Collapsible from 'react-collapsible';
import cx from 'classnames';

import Icon from 'src/components/Icon';

import * as styles from './Collapse.module.css';

function Collapse({ title, description, children, ...props }) {
  const [show, setShow] = useState(false);

  return (
    <Collapsible
      transitionTime={300}
      onOpening={() => setShow(true)}
      onClosing={() => setShow(false)}
      {...props}
      trigger={
        <div className={styles.CollapseTitle}>
          {title}
          <Icon
            className={cx(show ? styles.CollapseTitleIconActive : styles.CollapseTitleIcon)}
            icon="caret-down"
            size={12}
          />
        </div>
      }
    >
      <div className={styles.CollapseContent}>
        {description && (
          <p className={styles.CollapseDescription}>
            <FormattedMessage id={description} />
          </p>
        )}
        {children}
      </div>
    </Collapsible>
  );
}

export default Collapse;
