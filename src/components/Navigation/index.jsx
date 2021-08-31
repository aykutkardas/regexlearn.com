import "./navigation.scss";

import { FormattedMessage } from "react-intl";
import Icon from "../Icon";

function Navigation({ steps, step, nextStep, prevStep }) {
  return !steps.length ? null : (
    <div className="navigation">
      {step > 0 && (
        <div
          className="navigation-step navigation-prev-step"
          onClick={prevStep}
        >
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
        </div>
      )}
    </div>
  );
}

export default Navigation;
