import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../layout";
import "../globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Collaborative Platform</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
