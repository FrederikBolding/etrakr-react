import { createReducer } from "@reduxjs/toolkit";

import { create, update, remove, INITIAL_STATE, CacheState } from "./cache";

export const reducer = createReducer<CacheState>(INITIAL_STATE, (builder) =>
  builder
    .addCase(create, (state, action) => {
      const { data, type } = action.payload;
      return { ...state, [type]: [...state[type], { ...data, lastUpdated: new Date().toString()} ] };
    })
    .addCase(update, (state, action) => {
      const { type, data } = action.payload;
      const idx = state[type].findIndex((cache) => cache.id === data.id);
      state[type][idx] = { ...action.payload.data, lastUpdated: new Date().toString() };
    })
    .addCase(remove, (state, action) => {
      const { type, id } = action.payload;
      const idx = state[type].findIndex((cache) => cache.id === id);
      state[type].splice(idx, 1)
    })
);
