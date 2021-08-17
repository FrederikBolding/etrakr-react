import { combineReducers } from 'redux';

import { ApplicationState } from './store';
import { default as cacheSlice } from './cache.slice';
import { default as userDataSlice } from './userData.slice';

const reducer = combineReducers<ApplicationState>({
  cache: cacheSlice.reducer,
  userData: userDataSlice.reducer
});

export default reducer;