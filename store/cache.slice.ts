import { DataType } from "@api";
import { createSlice } from "@reduxjs/toolkit";
import { TrackableType } from "@types";

export type CacheType = DataType & { lastUpdated: string };

export type CacheState = {
  [key in TrackableType]: CacheType[];
};

export const initialState: CacheState = {
  [TrackableType.Tv]: [],
  [TrackableType.Movie]: [],
};

const slice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    create(state, action) {
      const { data, type } = action.payload;
      state[type].push({ ...data, lastUpdated: new Date().toString() });
    },
    update(state, action) {
      const { type, data } = action.payload;
      const idx = state[type].findIndex((cache) => cache.id === data.id);
      state[type][idx] = {
        ...action.payload.data,
        lastUpdated: new Date().toString(),
      };
    },
    remove(state, action) {
      const { type, id } = action.payload;
      const idx = state[type].findIndex((cache) => cache.id === id);
      state[type].splice(idx, 1);
    },
  },
});

export const { create, update, remove } = slice.actions;

export default slice;
