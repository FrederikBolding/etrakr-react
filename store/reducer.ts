import { combineReducers } from 'redux';

import { ApplicationState } from './store';
import { cacheReducer } from './cache';

const reducer = combineReducers<ApplicationState>({
  cache: cacheReducer
});

export default reducer;