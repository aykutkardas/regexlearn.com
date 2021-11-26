import { useCallback, useContext, useEffect, useState } from 'react';

import * as styles from './LanguageSwitch.module.css';
import Icon from '../Icon';
import Shortcut from '../Shortcut';

import langs, { langNames } from '../../localization';
import shortcuts from '../../shortcuts';
import { Context } from '../../contexts/LanguageContext';
import Mousetrap from '../../utils/mousetrap';

const langList = Object.keys(langs).map(langKey => ({
  value: langKey,
  label: langNames[langKey],
}));

const getCurrentIndex = (langList, lang) => langList.findIndex(({ value }) => value === lang);

const LanguageSwitch = () => {
  const { lang, setLang } = useContext(Context);
  const [currentLangIndex, setCurrentLangIndex] = useState(getCurrentIndex(langList, lang));

  const toggleLang = useCallback(() => {
    const newLangIndex = currentLangIndex + 1;
    if (newLangIndex > langList.length - 1) {
      setCurrentLangIndex(0);
      setLang(langList[0].value);
    } else {
      setCurrentLangIndex(newLangIndex);
      setLang(langList[newLangIndex].value);
    }
  }, [currentLangIndex, setLang]);

  useEffect(() => {
    Mousetrap.bindGlobal(shortcuts.languageSwitch, toggleLang);

    return () => Mousetrap.unbind(shortcuts.languageSwitch);
  }, [lang, toggleLang, setLang]);

  return (
    <div className={styles.LanguageSwitch}>
      <div className={styles.LanguageSwitchCurrent} role="button" tabIndex="0" onClick={toggleLang}>
        <Shortcut command={shortcuts.languageSwitch} />
        <span>{langNames[lang]}</span>
        <Icon className={styles.LanguageSwitchCurrentIcon} icon="earth" color="#fff" size={16} />
      </div>
    </div>
  );
};

export default LanguageSwitch;
