import { useState, useEffect, useRef } from 'react';
import ReactTooltip from 'react-tooltip';
import { FormattedMessage } from 'react-intl';
import useEventListener from '@use-it/event-listener';

import Shortcut from 'src/components/Shortcut';
import shortcuts from 'src/shortcuts';

interface Props {
  regex: string[];
  flags: string;
  hiddenFlags?: boolean;
}

const Hint = ({ regex, flags, hiddenFlags }: Props) => {
  const hintRef = useRef<HTMLDivElement>(null);
  const [showStatus, setShowStatus] = useState(false);

  const toggleShow = e => {
    if (!(e.altKey && e.key.toLowerCase() === 'h')) return;

    e.preventDefault();
    setShowStatus(!showStatus);

    if (showStatus) {
      ReactTooltip.hide(hintRef.current);
    } else {
      ReactTooltip.show(hintRef.current);
    }
  };

  useEventListener('keyup', toggleShow);

  useEffect(() => {
    ReactTooltip.hide(hintRef.current);
    setShowStatus(false);
  }, [regex, flags]);

  return (
    <div
      ref={hintRef}
      className="tw-select-none tw-cursor-pointer tw-text-[10px] tw-absolute tw-right-2"
      data-tip
      data-for="hint"
      data-event="click"
    >
      <span
        role="button"
        className="tw-flex tw-flex-col tw-items-end tw-justify-center tw-cursor-pointer hover:tw-text-green-300"
        onClick={toggleShow}
        onKeyPress={toggleShow}
        tabIndex={0}
      >
        <Shortcut command={shortcuts.hint} />
        <FormattedMessage id="general.hintQuestion" />
      </span>

      <ReactTooltip
        clickable
        className="tw-shadow-md tw-bg-neutral-800"
        id="hint"
        place="top"
        effect="solid"
      >
        <div className="tw-text-green-300">
          {regex.map(answer => (
            <div
              className="tw-px-2 tw-py-1 tw-mt-1 tw-border tw-border-neutral-800 tw-text-neutral-500"
              key={answer}
            >
              {!hiddenFlags && <span>/</span>}
              <span className="tw-text-green-400">{answer}</span>
              {!hiddenFlags && <span>/{flags}</span>}
            </div>
          ))}
        </div>
      </ReactTooltip>
    </div>
  );
};

export default Hint;
