import { FormattedMessage } from "react-intl";
import cx from "classnames";

import * as styles from "./Navigation.module.css";

import Icon from "../Icon";
import Shortcut from "../Shortcut";

import shortcuts from "../../shortcuts";

function Navigation({ steps, step, nextStep, prevStep, success, error }) {
  return !steps.length ? null : (
    <div className={styles.Navigation}>
      {step > 0 && (
        <div
          className={styles.NavigationStepPrev}
          role="button"
          tabIndex="0"
          onClick={prevStep}
          onKeyDown={prevStep}
        >
          <Shortcut command={shortcuts.prevStep} />
          <div className={styles.NavigationStepText}>
            <Icon className={styles.NavigationStepIcon} icon="arrow-left" size={20} />
            <FormattedMessage id="general.prev" />
          </div>
        </div>
      )}
      {step < steps.length - 1 && (
        <div
          className={styles.NavigationStepNext}
          role="button"
          tabIndex="0"
          onClick={nextStep}
          onKeyDown={nextStep}
        >
          <div className={styles.NavigationStepNextWrapper}>
            <Shortcut command={shortcuts.nextStep} />
            <Icon
              className={cx(styles.NavigationStepStatusIcon, {
                [styles.NavigationStepStatusIconUnlock]: success,
                [styles.NavigationStepStatusIconError]: error,
                "animate__animated animate__shakeX": error,
              })}
              icon={success ? "unlocked" : "lock"}
            />
          </div>
          <div className={styles.NavigationStepText}>
            <FormattedMessage id="general.next" />
            <Icon className={styles.NavigationStepIcon} icon="arrow-right" size={20} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
