import Head from "next/head";
import Script from "next/script";
import { Component } from "react";

export default class Activity extends Component {
  render() {
    return (
      <>
        <Head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="robots" content="noindex" />
          <title>Content Manager</title>
        </Head>
        <body>
          <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" />
        </body>
      </>
    );
  }
}
