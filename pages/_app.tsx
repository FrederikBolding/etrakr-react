import React from "react";
import { Provider } from "react-redux";

import { createStore } from "@store";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const store = createStore();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
