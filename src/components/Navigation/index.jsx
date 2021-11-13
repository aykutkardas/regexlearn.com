import { FormattedMessage } from "react-intl";
import cx from "classnames";

import Icon from "../Icon";
import Shortcut from "../Shortcut";

import shortcuts from "../../shortcuts";

function Navigation({ steps, step, nextStep, prevStep, success, error }) {
  return !steps.length ? null : (
    <div className="navigation">
      {step > 0 && (
        <div
          className="navigation-step navigation-prev-step"
          role="button"
          tabIndex="0"
          onClick={prevStep}
          onKeyDown={prevStep}
        >
          <Shortcut command={shortcuts.prevStep} />
          <div className="navigation-step-text">
            <Icon className="navigation-icon" icon="arrow-left" size={20} />
            <FormattedMessage id="general.prevStep" />
          </div>
        </div>
      )}
      {step < steps.length - 1 && (
        <div
          className="navigation-step navigation-next-step"
          role="button"
          tabIndex="0"
          onClick={nextStep}
          onKeyDown={nextStep}
        >
          <Shortcut command={shortcuts.nextStep} />
          <div className="navigation-step-text">
            <FormattedMessage id="general.nextStep" />
            <Icon className="navigation-icon" icon="arrow-right" size={20} />
          </div>
          <Icon
            className={cx("status-icon", {
              lock: !success,
              unlock: success,
              error,
              "animate__animated animate__shakeX": error,
            })}
            icon={success ? "unlocked" : "lock"}
          />
        </div>
      )}
    </div>
  );
}

export default Navigation;
