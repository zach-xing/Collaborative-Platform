import React from "react";
import Navigation from "./Navigation";
import Head from "next/head";

/**
 * 布局作用
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>还没想好</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Navigation />
      {children}
    </>
  );
};

export default Layout;
