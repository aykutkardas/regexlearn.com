import Document, { Html, Head, Main, NextScript } from "next/document";

const isDevelopment = process.env.NODE_ENV === "development";

class Documents extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {!isDevelopment && (
            <>
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-ZNDXNCMG6E"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-ZNDXNCMG6E');
            `,
                }}
              />
            </>
          )}
          <link rel="shortcut icon" href="/favicon.svg" />

          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:url" content="https://regexlearn.com/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Regex Learn - Step by step, from zero to advanced." />
          <meta property="og:description" content="Learn RegEx interactively, practice at your level, test and share your own RegEx." />
          <meta property="og:image" content="https://regexlearn.com/images/og-regexlearn-image.jpg" />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="regexlearn.com" />
          <meta property="twitter:url" content="https://regexlearn.com/" />
          <meta name="twitter:title" content="Regex Learn - Step by step, from zero to advanced." />
          <meta name="twitter:description" content="Learn RegEx interactively, practice at your level, test and share your own RegEx." />
          <meta name="twitter:image" content="https://regexlearn.com/images/og-regexlearn-image.jpg" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Documents;
