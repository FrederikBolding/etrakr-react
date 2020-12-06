import React from "react";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import { createStore } from "@store";
import { Layout } from "@components";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const store = createStore();

  return (
    <ChakraProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
