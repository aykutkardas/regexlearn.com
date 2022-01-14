import Icon from 'src/components/Icon';

import * as styles from './Social.module.css';

function Social() {
  return (
    <>
      <a
        href="https://github.com/aykutkardas/regexlearn.com"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className={styles.SocialLink}
      >
        <Icon icon="github" size={20} color="white" />
      </a>
      <a
        href="https://twitter.com/aykutkardas"
        target="_blank"
        rel="noreferrer"
        aria-label="Twitter"
        className={styles.SocialLink}
      >
        <Icon icon="twitter" size={20} color="white" />
      </a>
    </>
  );
}

export default Social;
