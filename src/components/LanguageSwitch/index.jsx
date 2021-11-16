import { useCallback, useContext, useEffect, useState } from "react";
import cx from "classnames";

import * as styles from "./LanguageSwitch.module.css";
import Icon from "../Icon";
import Shortcut from "../Shortcut";

import langs, { langNames } from "../../localization";
import shortcuts from "../../shortcuts";
import { Context } from "../../contexts/LanguageContext";
import Mousetrap from "../../utils/mousetrap";

const langList = Object.keys(langs).map((langKey) => ({
  value: langKey,
  label: langNames[langKey],
}));

const LanguageSwitch = () => {
  const { lang, setLang } = useContext(Context);

  const [visible, setVisible] = useState(false);

  const handleClick = (value) => {
    setLang(value);
  };

  const toggleVisible = useCallback(
    (e) => {
      e.preventDefault();
      setVisible(!visible);
    },
    [visible]
  );

  const availableLangList = langList.filter((item) => item.value !== lang);

  useEffect(() => {
    Mousetrap.bindGlobal(shortcuts.languageSwitch, toggleVisible);

    availableLangList.forEach((item, index) => {
      Mousetrap.bindGlobal(`${shortcuts.rootKey}+${index + 1}`, (e) => {
        e.preventDefault();
        setLang(item.value);
      });
    });

    return () =>
      Mousetrap.unbind([
        shortcuts.languageSwitch,
        ...availableLangList.map(
          (item, index) => `${shortcuts.rootKey}+${index}`
        ),
      ]);
  }, [visible, lang, toggleVisible, availableLangList, setLang]);

  return (
    <div className={styles.languageSwitch}>
      <div className={styles.languageSwitchCurrent}>
        <Shortcut command={shortcuts.languageSwitch} />
        <span>{langNames[lang]}</span>
        <Icon
          className={styles.languageSwitchCurrentIcon}
          icon="earth"
          color="#fff"
          size={20}
        />
      </div>
      <div
        className={cx(styles.languageSwitchList, {
          [styles.languageSwitchListVisible]: visible,
        })}
      >
        {availableLangList.map((item, index) => (
          <div
            key={item.value}
            role="button"
            tabIndex="0"
            onClick={() => handleClick(item.value)}
            onKeyDown={() => handleClick(item.value)}
            className={styles.languageSwitchListItem}
          >
            <div>
              <Shortcut command={`${shortcuts.rootKey}+${index + 1}`} />
            </div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitch;
