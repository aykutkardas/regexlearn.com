import { useCallback, useContext, useEffect, useState } from "react";

import Icon from "../Icon";
import Shortcut from "../Shortcut";

import langs, { langNames } from "../../localization";
import shortcuts from "../../shortcuts";
import { Context } from "../../contexts/LanguageContext";
import hotkeys from "../../utils/hotkeys";


const langList = Object.keys(langs).map((langKey) => ({
  value: langKey,
  label: langNames[langKey],
}));

const LanguageSwitch = () => {
  const { lang, setLang } = useContext(Context);

  const [visible, setVisible] = useState(false);

  const handleClick = (e) => {
    const { value } = e.target.dataset;
    setLang(value);
  };

  const toggleVisible = useCallback((e) => {
    e.preventDefault();
    setVisible(!visible);
  }, [visible]);

  const availableLangList = langList.filter((item) => item.value !== lang);

  useEffect(() => {
    hotkeys(shortcuts.languageSwitch, toggleVisible);

    availableLangList.forEach((item, index) => {
      hotkeys(`${shortcuts.languageSwitch}+${index + 1}`, (e) => {
        e.preventDefault();
        setLang(item.value);
      });
    });

    return () =>
      hotkeys.unbind([
        shortcuts.languageSwitch,
        ...availableLangList.map(
          (item, index) => `${shortcuts.languageSwitch}+${index}`
        ),
      ]);
  }, [visible, lang, toggleVisible, availableLangList, setLang]);

  return (
    <div className="language-switch">
      <div className="language-switch-current">
        <Shortcut command={shortcuts.languageSwitch} />
        <span>{langNames[lang]}</span>
        <Icon icon="earth" color="#fff" size={20} />
      </div>
      <div className={`language-switch-list ${visible ? "visible" : ""}`}>
        {availableLangList.map((item, index) => (
          <div
            key={item.value}
            role="button"
            tabIndex="0"
            onClick={handleClick}
            onKeyDown={handleClick}
            data-value={item.value}
            className="language-switch-list-item"
          >
            <Shortcut command={`${shortcuts.languageSwitch}+${index + 1}`} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitch;
