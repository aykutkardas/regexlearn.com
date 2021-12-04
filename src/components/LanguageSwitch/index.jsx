import { useContext, useState } from 'react';

import * as styles from './LanguageSwitch.module.css';
import Icon from '../Icon';

import langs, { langNames } from '../../localization';
import { Context } from '../../contexts/LanguageContext';

const langList = Object.keys(langs).map(langKey => ({
  value: langKey,
  label: langNames[langKey],
}));

const LanguageSwitch = () => {
  const { lang, setLang } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const toggleLang = () => {
    setIsOpen(!isOpen);
  };

  const selectLang = (lang, e) => {
    if (!isOpen) return;
    e.preventDefault();

    setLang(lang);
    setIsOpen(false);
  };

  const getAvailableList = () => langList.filter(({ value }) => lang !== value);

  return (
    <div className={styles.LanguageSwitch}>
      <div className={styles.LanguageSwitchCurrent} role="button" tabIndex="0" onClick={toggleLang}>
        <span>{langNames[lang]}</span>
        <Icon className={styles.LanguageSwitchCurrentIcon} icon="earth" color="#fff" size={16} />
      </div>
      {isOpen && (
        <div className={styles.LanguageSwitchList}>
          {getAvailableList().map(({ label, value }) => (
            <div
              className={styles.LanguageSwitchListItem}
              key={value}
              onClick={e => selectLang(value, e)}
            >
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
