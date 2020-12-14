import { combineReducers } from 'redux';

import { ApplicationState } from './store';
import { cacheReducer } from './cache';
import slice from './userData.slice';

const reducer = combineReducers<ApplicationState>({
  cache: cacheReducer,
  userData: slice.reducer
});

export default reducer;