import { useRef } from "react";
import ReactTooltip from "react-tooltip";
import { FormattedMessage } from "react-intl";
import Link from "next/link";

import Icon from "../Icon";
import LanguageSwitch from "../LanguageSwitch";

function LandingHeader() {
  const playgroundRef = useRef(null);

  return (
    <div className="landing-header">
      <Link href="/">
        <a className="landing-header-brand">
          <Icon
            className="landing-header-brand-icon"
            icon="unlocked"
            removeInlineStyle
          />
          <span className="landing-header-brand-name">RegexLearn</span>
        </a>
      </Link>

      <div className="landing-header-links">
        <a
          href="https://github.com/aykutkardas/regexlearn.com"
          target="_blank"
          rel="noreferrer"
          className="landing-header-link landing-link-github"
        >
          <Icon className="landing-link-github-icon" icon="github" size={20} />
        </a>
        <Link href="/learn" passHref>
          <a className="landing-header-link landing-link-learn">
            <FormattedMessage id="landing.learn" />
          </a>
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
        <LanguageSwitch />
      </div>
    </div>
  );
}

export default LandingHeader;
