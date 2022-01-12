import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import Icon from 'src/components/Icon';
import getIntlPath from 'src/utils/getIntlPath';
import { Context } from 'src/contexts/LanguageContext';
import { langNames } from 'src/localization';

import * as styles from './LanguageSwitch.module.css';

const langList = Object.keys(langNames).map(langKey => ({
  value: langKey,
  label: langNames[langKey],
}));

const LanguageSwitch = () => {
  const { lang } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useRouter();

  const toggleLanguageList = () => {
    setIsOpen(!isOpen);
  };

  const closeLanguageList = () => {
    setIsOpen(false);
  };

  const getAvailableList = () => langList.filter(({ value }) => lang !== value);

  return (
    <div className={styles.LanguageSwitch}>
      <div
        className={styles.LanguageSwitchCurrent}
        role="button"
        tabIndex="0"
        onClick={toggleLanguageList}
      >
        <span>{langNames[lang]}</span>
        <Icon icon="earth" className={styles.LanguageSwitchCurrentIcon} size={16} />
      </div>
      <div
        className={styles.LanguageSwitchList}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      >
        {getAvailableList().map(({ label, value }) => (
          <a
            href={getIntlPath(pathname, value, true)}
            key={value}
            onClick={closeLanguageList}
            className={styles.LanguageSwitchListItem}
          >
            <span>{label}</span>
            <Icon
              icon="arrow-left"
              className={styles.LanguageSwitchListItemIcon}
              size={16}
              removeInlineStyle
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitch;
