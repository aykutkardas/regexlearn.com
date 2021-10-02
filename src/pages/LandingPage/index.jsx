import "./landing-page.scss";

import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

import LandingRegexDemo from "../../components/LandingRegexDemo";
import Button from "../../components/Button";
import tagWrapper from "../../utils/tagWrapper";

function LandingPage() {
  const { formatMessage } = useIntl();
  return (
    <div className="container">
      <div className="content landing">
        <h1>
          <FormattedMessage id="landing.title" />
        </h1>
        <p
          dangerouslySetInnerHTML={{
            __html: tagWrapper(
              formatMessage({ id: "landing.description" }),
              /`(\S*?[^`]*)`/gim,
              "highlight"
            ),
          }}
        />
        <Link to="/learn">
          <Button className="primary">
            <FormattedMessage id="general.startLearning" />
          </Button>
        </Link>
      </div>
      <div className="intro">
        <LandingRegexDemo />
      </div>
    </div>
  );
}

export default LandingPage;
