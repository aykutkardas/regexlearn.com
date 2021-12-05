import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

import * as styles from './LearnFooter.module.css';

import Icon from 'src/components/Icon';
import Shortcut from 'src/components/Shortcut';

import shortcuts from 'src/shortcuts';

function LearnFooter({ steps, step, nextStep, prevStep, success, error }) {
  return (
    <div className={cx(styles.LearnFooter, 'container-fluid')}>
      <div className={cx(styles.LearnFooterRow, 'row')}>
        <div className={cx(styles.LearnFooterPrevWrapper, 'col-xs-4')}>
          {step > 0 && (
            <div
              className={styles.NavigationStepPrev}
              role="button"
              tabIndex="0"
              onClick={prevStep}
            >
              <Shortcut command={shortcuts.prevStep} />
              <div className={styles.NavigationStepText}>
                <Icon className={styles.NavigationStepIcon} icon="arrow-left" size={20} />
                <FormattedMessage id="general.prev" />
              </div>
            </div>
          )}
        </div>
        <div className={cx(styles.LearnFooterSocialWrapper, 'col-xs-4')}>
          <a href="https://github.com/aykutkardas/regexlearn.com" target="_blank" rel="noreferrer">
            <Icon className={styles.NavigationSocialIcon} icon="github" size={20} color="white" />
          </a>
          <a href="https://twitter.com/aykutkardas" target="_blank" rel="noreferrer">
            <Icon className={styles.NavigationSocialIcon} icon="twitter" size={20} color="white" />
          </a>
        </div>
        <div className={cx(styles.LearnFooterNextWrapper, 'col-xs-4')}>
          {step < steps.length - 1 && (
            <div
              className={styles.NavigationStepNext}
              role="button"
              tabIndex="0"
              onClick={nextStep}
            >
              <div className={styles.NavigationStepNextWrapper}>
                <Shortcut command={shortcuts.nextStep} />
                <Icon
                  className={cx(styles.NavigationStepStatusIcon, {
                    [styles.NavigationStepStatusIconUnlock]: success,
                    [styles.NavigationStepStatusIconError]: error,
                    'animate__animated animate__shakeX': error,
                  })}
                  icon={success ? 'unlocked' : 'lock'}
                />
              </div>
              <div className={styles.NavigationStepText}>
                <FormattedMessage id="general.next" />
                <Icon className={styles.NavigationStepIcon} icon="arrow-right" size={20} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LearnFooter;
