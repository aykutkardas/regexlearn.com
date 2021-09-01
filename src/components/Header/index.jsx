import "./header.scss";

import Icon from "../Icon";

const Header = ({ command }) => {
  return (
    <header className="header">
      <div className="header-social">
        <a href="https://github.com/aykutkardas/easy-regex" target="_blank">
          <Icon icon="github" size={20} color="white" />
        </a>
        <a href="https://twitter.com/aykutkardas" target="_blank">
          <Icon icon="twitter" size={20} color="white" />
        </a>
      </div>
    </header>
  );
};

export default Header;
