import { createAction } from '@reduxjs/toolkit';

import { TrackableData } from '@types';

export type CacheState = TrackableData[];

export const INITIAL_STATE: CacheState = [];

export const create = createAction<TrackableData>('cache/create');
export const update = createAction<TrackableData>('cache/update');
export const remove = createAction<void>('cache/remove');