import dynamic from "next/dynamic";
import { FormattedMessage, useIntl } from "react-intl";
import Head from "next/head";
import cx from "classnames";

import tagWrapper from "../utils/tagWrapper";

const ProductButton = dynamic(import("../components/ProductButton"), { ssr: true });
import Button from "../components/Button";
import Icon from "../components/Icon";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";

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
        <Section
          title="section.learn.title"
          description="section.learn.content"
          image="/Learn.webp"
          link="/learn"
          buttonText="general.startLearning"
        />
        <Section
          reverse
          title="section.cheatsheet.title"
          description="section.cheatsheet.content"
          image="/Cheatsheet.webp"
          link="/cheatsheet"
          buttonText="section.cheatsheet.button"
        />
        <Section
          title="section.playground.title"
          description="section.playground.content"
          image="/Playground.webp"
        />
        <Section
          reverse
          title="section.practice.title"
          description="section.practice.content"
          image="/Practise.webp"
        />
        <Section
          title="section.opensource.title"
          description="section.opensource.content"
          image="/Open Source.webp"
          link="https://github.com/aykutkardas/regexlearn.com"
          customButton={({ className }) => (
            <a
              href="https://github.com/aykutkardas/regexlearn.com"
              target="_blank"
              rel="noreferrer"
            >
              <Button className={cx("github", className)}>
                <Icon icon="github" size={16} color="white" />
                <span>GitHub</span>
              </Button>
            </a>
          )}
        />
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
