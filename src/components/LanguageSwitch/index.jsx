import { useCallback, useContext, useEffect, useState } from 'react';
import cx from 'classnames';

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

const LanguageSwitch = () => {
  const { lang, setLang } = useContext(Context);
  const [openLangList, setOpenLangList] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(
    langList.findIndex(langItem => langItem.value === lang),
  );

  const toggleLang = useCallback(() => {
    setOpenLangList(!openLangList);
  }, [openLangList, setOpenLangList]);

  const selectLang = useCallback(
    (lang, e) => {
      if (!openLangList) return;
      e.preventDefault();

      setLang(lang);
      setOpenLangList(false);
    },
    [setLang, openLangList],
  );

  const nextLang = useCallback(
    e => {
      if (!openLangList) return;
      e.preventDefault();

      const lastIndex = langList.length - 1;
      const newHoverIndex = hoverIndex + 1;
      setHoverIndex(newHoverIndex > lastIndex ? 0 : newHoverIndex);
    },
    [hoverIndex, openLangList],
  );

  const prevLang = useCallback(
    e => {
      if (!openLangList) return;
      e.preventDefault();

      const newHoverIndex = hoverIndex - 1;
      const lastIndex = langList.length - 1;
      setHoverIndex(newHoverIndex < 0 ? lastIndex : newHoverIndex);
    },
    [hoverIndex, openLangList],
  );

  useEffect(() => {
    Mousetrap.bindGlobal(shortcuts.languageSwitch, toggleLang);
    Mousetrap.bindGlobal(shortcuts.close, () => setOpenLangList(false));
    Mousetrap.bindGlobal(shortcuts.up, prevLang);
    Mousetrap.bindGlobal(shortcuts.down, nextLang);
    Mousetrap.bindGlobal(shortcuts.languageSelect, e => selectLang(langList[hoverIndex].value, e));

    return () => {
      Mousetrap.unbind(shortcuts.languageSwitch);
      Mousetrap.unbind(shortcuts.close);
    };
  }, [lang, selectLang, toggleLang, setLang, hoverIndex, nextLang, prevLang]);

  return (
    <div className={styles.LanguageSwitch}>
      <div className={styles.LanguageSwitchCurrent} role="button" tabIndex="0" onClick={toggleLang}>
        <Shortcut command={shortcuts.languageSwitch} />
        <span>{langNames[lang]}</span>
        <Icon className={styles.LanguageSwitchCurrentIcon} icon="earth" color="#fff" size={16} />
      </div>
      {openLangList && (
        <div className={styles.LanguageSwitchList}>
          {langList.map(({ label, value }, index) => (
            <div
              className={cx(styles.LanguageSwitchListItem, {
                [styles.LanguageSwitchListItemHover]: index === hoverIndex,
              })}
              key={value}
              onClick={e => selectLang(value, e)}
            >
              {hoverIndex === index && <Shortcut command={shortcuts.languageSelect} />}
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
