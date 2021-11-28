import { useState, useEffect, useRef, useCallback } from 'react';
import ReactTooltip from 'react-tooltip';
import { FormattedMessage } from 'react-intl';

import Mousetrap from '../../utils/mousetrap';
import shortcuts from '../../shortcuts';
import Shortcut from '../Shortcut';

import * as styles from './Hint.module.css';

const Hint = ({ regex, flags }) => {
  const hintRef = useRef(null);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    Mousetrap.bindGlobal(shortcuts.hint, toggleShow);

    return () => Mousetrap.unbind(shortcuts.hint);
  }, [toggleShow, showStatus]);

  const toggleShow = useCallback(() => {
    if (showStatus) {
      ReactTooltip.hide(hintRef.current);
      setShowStatus(false);
    } else {
      ReactTooltip.show(hintRef.current);
      setShowStatus(true);
    }
  }, [showStatus]);

  useEffect(() => {
    ReactTooltip.hide(hintRef.current);
    setShowStatus(false);
  }, [regex, flags]);

  return (
    <div ref={hintRef} className={styles.Hint} data-tip data-for="hint" data-event="click">
      <span
        role="button"
        className={styles.HintQuestion}
        onClick={toggleShow}
        onKeyPress={toggleShow}
        tabIndex={0}
      >
        <FormattedMessage id="general.hintQuestion" />
        <Shortcut command={shortcuts.hint} />
      </span>

      <ReactTooltip clickable className={styles.HintTooltip} id="hint" place="top" effect="solid">
        <div className={styles.HintAnswer}>
          {regex.map(answer => (
            <div className={styles.HintAnswerItem} key={answer}>
              /<span className={styles.HintAnswerHighlight}>{answer}</span>/{flags}
            </div>
          ))}
        </div>
      </ReactTooltip>
    </div>
  );
};

export default Hint;
