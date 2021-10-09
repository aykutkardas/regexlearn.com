import "./header.scss";

import { Link } from "react-router-dom";

import Icon from "@components/Icon";
import LanguageSwitch from "@components/LanguageSwitch";
import Progress from "@components/Progress";

const Header = ({ lang, setLang, steps, step }) => (
  <header className="header">
    <div className="header-social">
      <Link to="/">
        <Icon icon="home" size={20} color="white" />
      </Link>
      <a
        href="https://github.com/aykutkardas/regexlearn.com"
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
    <Progress steps={steps} step={step} />
    <LanguageSwitch lang={lang} setLang={setLang} />
  </header>
);

export default Header;
