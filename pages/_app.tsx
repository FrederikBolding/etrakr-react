import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";

import { createStore } from "@store";
import { Layout, Loading } from "@components";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const { store, persistor } = createStore();

  return (
    <ChakraProvider>
      <Provider store={store}>
        <Layout>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
