import "./language-switch.scss";

import React, { useEffect, useState } from "react";

import langs, { langNames } from "../../localization";
import Icon from "../Icon";
import Shortcut from "../Shortcut";
import Mousetrap from "mousetrap";

const langList = Object.keys(langs).map((langKey) => ({
  value: langKey,
  label: langNames[langKey],
}));

const LanguageSwitch = ({ lang, setLang }) => {
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
    Mousetrap.bindGlobal("alt+l", toggleVisible);

    availableLangList.forEach((item, index) => {
      Mousetrap.bindGlobal("alt+l+" + (index + 1), (e) => {
        e.preventDefault();
        setLang(item.value);
      });
    });

    return () =>
      Mousetrap.unbindGlobal([
        "alt+l",
        ...availableLangList.map((item, index) => "alt+l+" + index),
      ]);
  }, [visible, lang]);

  return (
    <div className="language-switch">
      <div className="language-switch-current">
        <Shortcut command={`ALT + L`} />
        {langNames[lang]}
        <Icon icon="earth" color="#fff" size={15}></Icon>
      </div>
      <div className={"language-switch-list " + (visible ? "visible" : "")}>
        {availableLangList.map((item, index) => (
          <div
            key={item.value}
            onClick={handleClick}
            data-value={item.value}
            className="language-switch-list-item"
          >
            <Shortcut command={`ALT + L + ` + (index + 1)} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitch;
