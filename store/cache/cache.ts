import { createAction } from '@reduxjs/toolkit';

import { TrackableType } from '@types';

export type CacheState = {
    [key in TrackableType]: any[];
};

export const INITIAL_STATE: CacheState = { [TrackableType.Tv]: [], [TrackableType.Movie]: [] };

export const create = createAction<{ type: TrackableType, data: any}>('cache/create');
export const update = createAction<{ type: TrackableType, data: any}>('cache/update');
export const remove = createAction<{ type: TrackableType, id: string}>('cache/remove');