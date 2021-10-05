import "./landing-header.scss";

import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import Icon from "../Icon";

function LandingHeader() {
  const { formatMessage } = useIntl();

  return (
    <div className="container landing-header">
      <Link to="/" className="landing-header-brand">
        <span className="landing-header-brand-name">RegexLearn</span>
      </Link>

      <div className="landing-header-links">
        <Link to="/learn" className="landing-link-learn">
          {formatMessage({ id: "landing.learn" })}
        </Link>

        <div className="landing-link-playground">
          <span className="landing-link-playground-name">
            {formatMessage({ id: "landing.playground" })}
          </span>
          <Icon
            icon="lock"
            size={16}
            className="landing-link-playground-icon"
          />
        </div>
        <a
          href="https://github.com/aykutkardas/regexlearn.com"
          target="_blank"
          rel="noreferrer"
          className="landing-link-github"
        >
          <Icon
            className="landing-link-github-icon"
            icon="github"
            size={20}
          ></Icon>
        </a>
      </div>
    </div>
  );
}

export default LandingHeader;
