import dynamic from "next/dynamic";

const LearnPage = dynamic(import("../components/LearnPage"), { ssr: false });

export default function Learn() {
  return (
    <>
      <LearnPage />
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {},
  }
}
