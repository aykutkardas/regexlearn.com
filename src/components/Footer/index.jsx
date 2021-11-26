import { FormattedMessage } from 'react-intl';
import Icon from '../Icon';

import * as styles from './Footer.module.css';

function Footer() {
  return (
    <footer className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className={styles.Footer}>
            <div className={styles.FooterSocial}>
              <a
                href="https://github.com/aykutkardas/regexlearn.com"
                target="_blank"
                rel="noreferrer"
                className={styles.FooterSocialLink}
              >
                <Icon icon="github" size={20} color="white" />
              </a>
              <a
                href="https://twitter.com/aykutkardas"
                target="_blank"
                rel="noreferrer"
                className={styles.FooterSocialLink}
              >
                <Icon icon="twitter" size={20} color="white" />
              </a>
            </div>
            <div className={styles.FooterCopyright}>
              <a
                className={styles.FooterCopyrightLink}
                target="_blank"
                rel="noreferrer"
                href="https://github.com/aykutkardas/regexlearn.com#sponsoring"
              >
                <FormattedMessage id="general.becomeSponsor" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
