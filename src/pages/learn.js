import dynamic from "next/dynamic";
import Head from "next/head";

const LearnPage = dynamic(import("../components/LearnPage"), { ssr: false });

export default function Learn() {
  return (
    <>
      <Head>
        <title>RegexLearn - Interactive Course</title>
      </Head>
      <LearnPage />
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {},
  }
}
