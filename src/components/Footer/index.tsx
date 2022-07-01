import { FormattedMessage } from 'react-intl';

import Social from 'src/components/Social';

import packageInfo from 'package.json';

import styles from './Footer.module.css';

const Footer = () => (
  <footer className="container">
    <div className="row">
      <div className="col-sm-12">
        <div className={styles.Footer}>
          <div className={styles.FooterSocial}>
            <Social />
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
          <span className={styles.Version}>v{packageInfo.version}</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
