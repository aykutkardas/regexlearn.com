import { FormattedMessage, useIntl } from "react-intl";
import Head from "next/head";

import tagWrapper from "../utils/tagWrapper";

import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheatsheetItemTitle from "../components/CheatsheetItemTitle";

import data from "../cheatsheet.json";
import Collapse from "../components/Collapse";


export default function Home() {
  const { formatMessage } = useIntl();

  const firstBlockDatas = data.slice(0, 3);
  const secondBlockDatas = data.slice(3, 4);
  const thirdBlockDatas = data.slice(4, 6);

  return (
    <>
      <Header />
      <Head>
        <title>{formatMessage({ id: "meta.cheatsheet.title" })}</title>
      </Head>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
                {firstBlockDatas.map(arr => (
                  <>
                    <h4>{formatMessage({ id: arr.title})}</h4>
                    {arr.data.map(item => (
                      <Collapse
                        key={item.title}
                        data={item}
                        title={<CheatsheetItemTitle data={item} />}
                      />                
                    ))}
                  </>
                ))}
            </div>
            <div className="col-lg-4 col-md-5">
                {secondBlockDatas.map(arr => (
                  <>
                    <h4>{formatMessage({ id: arr.title})}</h4>
                    {arr.data.map(item => (
                      <Collapse
                        key={item.title}
                        data={item}
                        title={<CheatsheetItemTitle data={item} />}
                      />                
                    ))}
                  </>
                ))}
            </div>
            <div className="col-lg-3 col-md-6">
              {thirdBlockDatas.map(arr => (
                <>
                  <h4>{formatMessage({ id: arr.title})}</h4>
                  {arr.data.map(item => (
                    <Collapse
                      key={item.title}
                      data={item}
                      title={<CheatsheetItemTitle data={item} />}
                    />                
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>
      <Footer />
    </>);
}

export async function getStaticProps(context) {
  return {
    props: {},
  }
}