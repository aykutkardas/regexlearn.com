import "./hint.scss";

import { useEffect, useRef } from "react";
import ReactTooltip from "react-tooltip";
import { FormattedMessage } from "react-intl";
import Mousetrap from "mousetrap";

import Shortcut from "../Shortcut";
import shortcuts from "../../shortcuts";

const Hint = ({ regex, flags }) => {
  const hintRef = useRef(null);

  useEffect(() => {
    const hintElement = hintRef.current;

    Mousetrap.bindGlobal(shortcuts.hint, () => {
      ReactTooltip.show(hintElement);
    });

    return () => {
      Mousetrap.unbindGlobal(shortcuts.hint);
      ReactTooltip.hide(hintElement);
    };
  }, [regex]);

  return (
    <div ref={hintRef} className="hint" data-tip data-for="hint">
      <span className="hint-question">
        <FormattedMessage id="general.hintQuestion" />
        <Shortcut command={shortcuts.hint} />
      </span>

      <ReactTooltip
        backgroundColor="#444"
        arrowColor="#444"
        clickable
        id="hint"
        place="top"
        effect="solid"
      >
        <span className="hint-answer">
          /{regex}/{flags}
        </span>
      </ReactTooltip>
    </div>
  );
};

export default Hint;
