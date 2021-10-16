import "./header.scss";

import { useRef, useState } from "react";
import ReactTooltip from "react-tooltip";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import Icon from "@components/Icon";

import Burger from "./components/index";

function LandingHeader() {
  const playgroundRef = useRef(null);
  const [navToggle, setNavToggle] = useState(false);

  return (
    <div className="landing-header">
      <Link to="/" className="landing-header-brand">
        <span className="landing-header-brand-name">RegexLearn</span>
      </Link>

      <div className={`landing-header-links ${navToggle ? "" : "hidden"}`}>
        <Link to="/learn" className="landing-header-link landing-link-learn">
          <FormattedMessage id="landing.learn" />
        </Link>

        <span
          ref={playgroundRef}
          className="landing-header-link landing-link-playground"
          data-tip
          data-for="playground-link"
        >
          <span className="landing-link-playground-name">
            <FormattedMessage id="landing.playground" />
          </span>
          <Icon
            icon="lock"
            size={16}
            className="landing-link-playground-icon"
          />
          <ReactTooltip
            backgroundColor="#444"
            arrowColor="#444"
            clickable
            id="playground-link"
            place="bottom"
            effect="solid"
          >
            <FormattedMessage id="general.comingSoon" />
          </ReactTooltip>
        </span>
        <a
          href="https://github.com/aykutkardas/regexlearn.com"
          target="_blank"
          rel="noreferrer"
          className="landing-header-link landing-link-github"
        >
          <Icon className="landing-link-github-icon" icon="github" size={20} />
        </a>
      </div>
      <Burger open={navToggle} setOpen={setNavToggle} />
    </div>
  );
}

export default LandingHeader;
