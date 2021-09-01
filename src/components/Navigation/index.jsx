import "./navigation.scss";

import { FormattedMessage } from "react-intl";
import Icon from "../Icon";
import Shortcut from "../Shortcut";
import getOS from "../../utils/getOS";

function Navigation({ steps, step, nextStep, prevStep }) {
  const currentOS = getOS();
  const isDesktop = ["Windows", "Mas OS", "Linux"].includes(currentOS);
  const metaKey = currentOS === "Mac OS" ? "CMD" : "CTRL";

  return !steps.length ? null : (
    <div className="navigation">
      {step > 0 && (
        <div
          className="navigation-step navigation-prev-step"
          onClick={prevStep}
        >
          {isDesktop && <Shortcut command={`${metaKey} + <`} />}
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
          {isDesktop && <Shortcut command={`${metaKey} + >`} />}
        </div>
      )}
    </div>
  );
}

export default Navigation;
