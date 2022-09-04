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
      className="select-none cursor-pointer text-[10px] absolute right-2 bottom-1"
      data-tip
      data-for="hint"
      data-event="click"
    >
      <span
        role="button"
        className="flex flex-col items-end justify-center cursor-pointer hover:text-green-300"
        onClick={toggleShow}
        onKeyPress={toggleShow}
        tabIndex={0}
      >
        <Shortcut command={shortcuts.hint} />
        <FormattedMessage id="general.hintQuestion" />
      </span>

      <ReactTooltip
        clickable
        className="shadow-md bg-neutral-800"
        id="hint"
        place="top"
        effect="solid"
      >
        <div className="text-green-300">
          {regex.map(answer => (
            <div className="px-2 py-1 mt-1 border border-neutral-800 text-neutral-500" key={answer}>
              {!hiddenFlags && <span>/</span>}
              <span className="text-green-400">{answer}</span>
              {!hiddenFlags && <span>/{flags}</span>}
            </div>
          ))}
        </div>
      </ReactTooltip>
    </div>
  );
};

export default Hint;
