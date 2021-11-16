import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import Head from "next/head";

import tagWrapper from "../utils/tagWrapper";

import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Header />
      <Head>
        <title>{formatMessage({ id: "meta.landing.title" })}</title>
      </Head>
      <div className="container">
        <div className="row main-section">
          <div className="col-md-6 col-sm-12">
            <div className="landing">
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
              <Link href="/learn" passHref>
                <a>
                  <Button className="success">
                    <FormattedMessage id="general.startLearning" />
                  </Button>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 visible-md visible-lg intro">
            <img
              src="/Done.webp"
              width="100%"
              alt="a relaxed man with his legs on the table"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
