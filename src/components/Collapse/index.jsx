import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Collapsible from 'react-collapsible';
import cx from 'classnames';

import CheatsheetDemo from 'src/components/CheatsheetDemo';
import Icon from 'src/components/Icon';

import * as styles from './Collapse.module.css';

function Collapse({ title, data }) {
  const [show, setShow] = useState(false);

  return (
    <Collapsible
      transitionTime={300}
      onOpening={() => setShow(true)}
      onClosing={() => setShow(false)}
      trigger={
        <div className={styles.CollapseTitle}>
          {title}
          <Icon
            className={cx(show ? styles.CollapseTitleIconActive : styles.CollapseTitleIcon)}
            icon="caret-up"
            size={12}
          />
        </div>
      }
    >
      <div className={styles.CollapseContent}>
        {data.description && (
          <p className={styles.CollapseDescription}>
            <FormattedMessage id={data.description} />
          </p>
        )}
        <CheatsheetDemo data={data} />
      </div>
    </Collapsible>
  );
}

export default Collapse;
