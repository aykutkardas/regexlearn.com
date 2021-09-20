import "./navigation.scss";

import { FormattedMessage } from "react-intl";
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
          <Icon icon="arrow-left2" size={20} />
          <FormattedMessage id="general.prevStep" />
        </div>
      )}
      {step < steps.length - 1 && (
        <div
          className="navigation-step navigation-next-step"
          onClick={nextStep}
        >
          <FormattedMessage id="general.nextStep" />
          <Icon icon="arrow-right2" size={20} />
          <Icon
            className="lock-icon"
            icon={success ? "unlocked" : "lock"}
            color={success ? "#5ff59b" : "gray"}
            size={20}
          />
          <Shortcut command={shortcuts.nextStep} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
