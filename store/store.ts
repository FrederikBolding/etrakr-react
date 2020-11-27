import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { CacheState } from './cache';

import reducer from './reducer';

export interface ApplicationState {
  cache: CacheState;
}

export type ApplicationDispatch = ReturnType<typeof createStore>['dispatch'];

export const createStore = (): EnhancedStore<ApplicationState> => {
  return configureStore({
    reducer
  });
};