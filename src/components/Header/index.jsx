/* eslint-disable @next/next/no-img-element */
import ReactTooltip from "react-tooltip";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import dynamic from "next/dynamic";

import Icon from "../Icon";
const LanguageSwitch  = dynamic(import("../LanguageSwitch"), { ssr: false });

function LandingHeader() {

  return (
    <div className="landing-header">
      <Link href="/">
        <a className="landing-header-brand">
          <Icon
            className="landing-header-brand-icon"
            icon="unlocked"
            removeInlineStyle
          />
          <span className="landing-header-brand-name">
            <img width={99} height={24} src="/logo.png" alt="RegexLearn" />
            </span>
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
        <Link href="/learn.html" passHref>
          <a className="landing-header-link landing-link-learn">
            <FormattedMessage id="landing.learn" />
          </a>
        </Link>
        <span
          className="landing-header-link landing-link-playground"
          data-tip
          data-for="coming-soon"
        >
          <span className="landing-link-playground-name">
            <FormattedMessage id="landing.cheatsheet" />
          </span>
          <Icon
            icon="lock"
            size={16}
            className="landing-link-playground-icon"
          />
        </span>
        <span
          className="landing-header-link landing-link-playground"
          data-tip
          data-for="coming-soon"
        >
          <span className="landing-link-playground-name">
            <FormattedMessage id="landing.playground" />
          </span>
          <Icon
            icon="lock"
            size={16}
            className="landing-link-playground-icon"
          />
        </span>
        <ReactTooltip
            backgroundColor="#444"
            arrowColor="#444"
            clickable
            id="coming-soon"
            place="bottom"
            effect="solid"
          >
            <FormattedMessage id="general.comingSoon" />
          </ReactTooltip>
        <LanguageSwitch />
      </div>
    </div>
  );
}

export default LandingHeader;
