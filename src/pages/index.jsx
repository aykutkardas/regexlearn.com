import Link from "next/link";
import dynamic from "next/dynamic";
import { FormattedMessage, useIntl } from "react-intl";
import Head from "next/head";

import tagWrapper from "../utils/tagWrapper";

const ProductButton = dynamic(import("../components/ProductButton"), { ssr: true });
import Button from "../components/Button";
import Icon from "../components/Icon";
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
              <ProductButton />
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
        <div className="row sub-section">
          <div className="col-xs-12 col-sm-12 col-md-6 sub-section-image">
            <img
              src="/Learn.webp"
              className="img-responsive"
              alt=""
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 sub-section-content">
            <div className="landing-section">
              <h2>
                <FormattedMessage id="section.learn.title" />
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: tagWrapper(
                    formatMessage({ id: "section.learn.content" }),
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
        </div>
        <div className="row sub-section sub-section-reverse">
          <div className="col-xs-12 col-sm-12 col-md-6 sub-section-content">
            <div className="landing-section">
              <h2>
                <FormattedMessage id="landing.cheatsheet" />
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: tagWrapper(
                    formatMessage({ id: "section.cheatsheet.content" }),
                    /`(\S*?[^`]*)`/gim,
                    "highlight"
                  ),
                }}
              />
              <Link href="/cheatsheet" passHref>
                <a>
                  <Button className="success">
                    <FormattedMessage id="section.cheatsheet.button" />
                  </Button>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 sub-section-image">
            <img
              src="/Cheatsheet.webp"
              className="img-responsive"
              alt=""
            />
          </div>
        </div>
        <div className="row sub-section sub-section">
          <div className="col-xs-12 col-sm-12 col-md-6 sub-section-image">
            <img
              src="/Playground.webp"
              className="img-responsive"
              alt=""
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 sub-section-content">
            <div className="landing-section">
              <h2>
                <FormattedMessage id="landing.playground" />
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: tagWrapper(
                    formatMessage({ id: "section.playground.content" }),
                    /`(\S*?[^`]*)`/gim,
                    "highlight"
                  ),
                }}
              />
            </div>
          </div>
        </div>
        <div className="row sub-section sub-section-reverse">
          <div className="col-xs-12 col-sm-12 col-md-6 sub-section-content">
            <div className="landing-section">
              <h2>
                <FormattedMessage id="section.practice.title" />
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: tagWrapper(
                    formatMessage({ id: "section.practice.content" }),
                    /`(\S*?[^`]*)`/gim,
                    "highlight"
                  ),
                }}
              />
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 sub-section-image">
            <img
              src="/Practise.webp"
              className="img-responsive"
              alt=""
            />
          </div>
        </div>
        <div className="row sub-section sub-section">
          <div className="col-xs-12 col-sm-12 col-md-6 sub-section-image">
            <img
              src="/Open Source.webp"
              className="img-responsive"
              alt=""
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 sub-section-content">
            <div className="landing-section">
              <h2>
                <FormattedMessage id="section.opensource.title" />
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: tagWrapper(
                    formatMessage({ id: "section.opensource.content" }),
                    /`(\S*?[^`]*)`/gim,
                    "highlight"
                  ),
                }}
              />

              <a
                href="https://github.com/aykutkardas/regexlearn.com"
                target="_blank"
                rel="noreferrer"
              >
                <Button className="github">
                  <Icon icon="github" size={16} color="white" />
                  <span>GitHub</span>
                </Button>
              </a>

            </div>
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
