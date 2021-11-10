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
            size={20}
            icon="unlocked"
            removeInlineStyle
          />
          <span className="landing-header-brand-name">
            <img src="/logo.png" alt="RegexLearn" />
            </span>
        </a>
      </Link>

      <div className="landing-header-links">
        <Link href="/learn" passHref>
          <a className="landing-header-link landing-link-learn">
            <FormattedMessage id="landing.learn" />
          </a>
        </Link>
        <span
          className="landing-header-link landing-link-disabled"
          data-tip
          data-for="coming-soon"
        >
          <span className="landing-link-disabled-name">
            <FormattedMessage id="landing.cheatsheet" />
          </span>
          <Icon
            icon="lock"
            size={16}
            className="landing-link-disabled-icon"
          />
        </span>
        <span
          className="landing-header-link landing-link-disabled"
          data-tip
          data-for="coming-soon"
        >
          <span className="landing-link-disabled-name">
            <FormattedMessage id="landing.playground" />
          </span>
          <Icon
            icon="lock"
            size={16}
            className="landing-link-disabled-icon"
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
