/* eslint-disable @next/next/no-img-element */
import ReactTooltip from "react-tooltip";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import dynamic from "next/dynamic";

import Icon from "../Icon";
const LanguageSwitch  = dynamic(import("../LanguageSwitch"), { ssr: false });

function LandingHeader() {

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="landing-header">
            <Link href="/">
              <a className="landing-header-brand">
                <Icon
                  className="landing-header-brand-icon"
                  icon="unlocked"
                  removeInlineStyle
                />
                <span className="landing-header-brand-image">
                  <img src="/logo.png" alt="RegexLearn" />
                </span>
              </a>
            </Link>

            <div className="landing-header-links">
              <Link href="/learn" passHref>
                <a className="landing-header-link">
                  <FormattedMessage id="landing.learn" />
                </a>
              </Link>
              <Link href="/cheatsheet" passHref>
                <a className="landing-header-link">
                  <FormattedMessage id="landing.cheatsheet" />
                </a>
              </Link>
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
        </div>
      </div>
    </div>
  );
}

export default LandingHeader;
