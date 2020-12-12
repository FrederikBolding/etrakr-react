import { createAction } from '@reduxjs/toolkit';

import { DataType } from '@api';
import { TrackableType } from '@types';

export type CacheType = DataType & { lastUpdated: string }

export type CacheState = {
    [key in TrackableType]: CacheType[];
};

export const INITIAL_STATE: CacheState = { [TrackableType.Tv]: [], [TrackableType.Movie]: [] };

export const create = createAction<{ type: TrackableType, data: DataType}>('cache/create');
export const update = createAction<{ type: TrackableType, data: DataType}>('cache/update');
export const remove = createAction<{ type: TrackableType, id: string}>('cache/remove');