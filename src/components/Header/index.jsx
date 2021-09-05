import "./header.scss";

import Icon from "../Icon";
import LanguageSwitch from "../LanguageSwitch";

const Header = ({ lang, setLang }) => {
  return (
    <header className="header">
      <div className="header-social">
        <a
          href="https://github.com/aykutkardas/easy-regex"
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon="github" size={20} color="white" />
        </a>
        <a
          href="https://twitter.com/aykutkardas"
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon="twitter" size={20} color="white" />
        </a>
      </div>
      <LanguageSwitch lang={lang} setLang={setLang} />
    </header>
  );
};

export default Header;
