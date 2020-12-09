import React from "react";
import Head from "next/head";

import { Header } from "./Header";

export const Layout = ({ children }) => (
  <>
    <Header />
    <Head>
      <title>eTrakr</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {children}
  </>
);
