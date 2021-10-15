import "./language-switch.scss";

import { useContext, useEffect, useState } from "react";
import Mousetrap from "mousetrap";

import Icon from "@components/Icon";
import Shortcut from "@components/Shortcut";

import langs, { langNames } from "../../localization";
import shortcuts from "../../shortcuts";
import { Context } from "../../contexts/LanguageContext";

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

  const toggleVisible = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  const availableLangList = langList.filter((item) => item.value !== lang);

  useEffect(() => {
    Mousetrap.bindGlobal(shortcuts.languageSwitch, toggleVisible);

    availableLangList.forEach((item, index) => {
      Mousetrap.bindGlobal(`${shortcuts.languageSwitch}+${index + 1}`, (e) => {
        e.preventDefault();
        setLang(item.value);
      });
    });

    return () =>
      Mousetrap.unbindGlobal([
        shortcuts.languageSwitch,
        ...availableLangList.map(
          (item, index) => `${shortcuts.languageSwitch}+${index}`
        ),
      ]);
  }, [visible, lang]);

  return (
    <div className="language-switch">
      <div className="language-switch-current">
        <Shortcut command={shortcuts.languageSwitch} />
        {langNames[lang]}
        <Icon icon="earth" color="#fff" size={15} />
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
