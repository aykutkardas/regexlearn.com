import "./landing-page.scss";

import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

import tagWrapper from "@utils/tagWrapper";

import Button from "@components/Button";

import RegexDemo from "./components/RegexDemo";
import Header from "./components/Header";

function LandingPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Header />
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
          <RegexDemo />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
