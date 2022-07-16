import { useState, CSSProperties } from 'react';
import { useRouter } from 'next/router';

import Icon from 'src/components/Icon';
import getIntlPath from 'src/utils/getIntlPath';
import { langNames } from 'src/localization';

import styles from './LanguageSwitch.module.css';

const langList = Object.keys(langNames).map(langKey => ({
  value: langKey,
  label: langNames[langKey],
}));

const LanguageSwitch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname, query } = useRouter();
  const { lang } = query;
  let currentLang;

  if (typeof lang === 'string') {
    currentLang = langNames[lang];
  }

  const toggleLanguageList = () => setIsOpen(!isOpen);

  const closeLanguageList = () => setIsOpen(false);

  const availableLangList = langList.filter(({ value }) => lang !== value);

  const languageSwitchListStyle: CSSProperties = {
    visibility: isOpen ? 'visible' : 'hidden',
    opacity: isOpen ? 1 : 0,
  };

  return (
    <div className={styles.LanguageSwitch}>
      <div
        className={styles.LanguageSwitchCurrent}
        role="button"
        tabIndex={0}
        onClick={toggleLanguageList}
      >
        <span>{currentLang}</span>
        <Icon icon="earth" className={styles.LanguageSwitchCurrentIcon} size={16} />
      </div>
      <div className={styles.LanguageSwitchList} style={languageSwitchListStyle}>
        {availableLangList.map(({ label, value }) => (
          <a
            href={getIntlPath({ href: pathname, lang: value, query })}
            key={value}
            onClick={closeLanguageList}
            className={styles.LanguageSwitchListItem}
          >
            <span>{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitch;
