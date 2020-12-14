import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { CacheState } from './cache';
import { UserDataState } from './userData';

import reducer from './reducer';

export interface ApplicationState {
  cache: CacheState;
  userData: UserDataState;
}

export type ApplicationDispatch = ReturnType<typeof createStore>['dispatch'];

export const createStore = (): EnhancedStore<ApplicationState> => {
  return configureStore({
    reducer
  });
};