import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import CheatsheetDemo from '../CheatsheetDemo';
import Icon from '../Icon';

import * as styles from './Collapse.module.css';

function Collapse({ title, data }) {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  return (
    <div className={styles.Collapse}>
      <div className={styles.CollapseTitle} onClick={toggle}>
        {title}
        <Icon
          className={styles.CollapseTitleIcon}
          icon={show ? 'caret-up' : 'caret-down'}
          style={{ color: show ? 'var(--txt-1)' : 'var(--gray)' }}
          size={12}
        />
      </div>
      <div style={{ height: show ? 190 : 0 }} className={styles.CollapseContent}>
        <div className={styles.CollapseContentInner}>
          {data.description && (
            <p className={styles.CollapseDescription}>
              <FormattedMessage id={data.description} />
            </p>
          )}
          <CheatsheetDemo data={data} />
        </div>
      </div>
    </div>
  );
}

export default Collapse;
