import "./navigation.scss";

import { FormattedMessage } from "react-intl";
import cx from "classnames";

import Icon from "../Icon";
import Shortcut from "../Shortcut";
import shortcuts from "../../shortcuts";

function Navigation({ steps, step, nextStep, prevStep, success }) {
  return !steps.length ? null : (
    <div className="navigation">
      {step > 0 && (
        <div
          className="navigation-step navigation-prev-step"
          onClick={prevStep}
        >
          <Shortcut command={shortcuts.prevStep} />
          <Icon className="navigation-icon" icon="arrow-left2" size={20} />
          <FormattedMessage id="general.prevStep" />
        </div>
      )}
      {step < steps.length - 1 && (
        <div
          className="navigation-step navigation-next-step"
          onClick={nextStep}
        >
          <FormattedMessage id="general.nextStep" />
          <Icon className="navigation-icon" icon="arrow-right2" size={20} />
          <Icon
            className={cx("status-icon", {
              lock: !success,
              unlock: success,
            })}
            icon={success ? "unlocked" : "lock"}
          />
          <Shortcut command={shortcuts.nextStep} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
