import Document, { Html, Head, Main, NextScript } from 'next/document';

const isDevelopment = process.env.NODE_ENV === 'development';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="dark">
        <Head>
          {!isDevelopment && (
            <>
              {/* <!-- Google Tag Manager --> */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WMNH2QX');`,
                }}
              />
              {/* <!-- End Google Tag Manager --> */}
            </>
          )}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
            rel="stylesheet"
          />

          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {!isDevelopment && (
            <>
              {/* <!-- Google Tag Manager (noscript) --> */}
              <noscript>
                <iframe
                  src="https://www.googletagmanager.com/ns.html?id=GTM-WMNH2QX"
                  style={{ height: 0, width: 0, display: 'none', visibility: 'hidden' }}
                />
              </noscript>
              {/* <!-- End Google Tag Manager (noscript) --> */}
            </>
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
