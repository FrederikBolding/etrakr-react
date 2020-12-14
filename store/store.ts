import { configureStore } from "@reduxjs/toolkit";
import { CacheState } from "./cache";
import { UserDataState } from "./userData.slice";

import reducer from "./reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface ApplicationState {
  cache: CacheState;
  userData: UserDataState;
}

export type ApplicationDispatch = ReturnType<typeof createStore>["store"]["dispatch"];

export const createStore = () => {
  const persistConfig = {
    key: "root",
    version: 1,
    blacklist: [],
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, reducer);

  const store = configureStore({
    reducer: persistedReducer,
  });

  const persistor = persistStore(store);

  return { store, persistor };
};
