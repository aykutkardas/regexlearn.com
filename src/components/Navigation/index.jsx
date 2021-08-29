import "./navigation.scss";

import { FormattedMessage } from "react-intl";

function Navigation({ steps, step, nextStep, prevStep }) {
  return !steps.length ? null : (
    <div className="navigation">
      {step > 0 && (
        <div
          className="navigation-step navigation-prev-step"
          onClick={prevStep}
        >
          <FormattedMessage id="general.prevStep" />
        </div>
      )}
      {step < steps.length - 1 && (
        <div
          className="navigation-step navigation-next-step"
          onClick={nextStep}
        >
          <FormattedMessage id="general.nextStep" />
        </div>
      )}
    </div>
  );
}

export default Navigation;
