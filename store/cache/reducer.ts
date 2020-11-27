import { createReducer } from "@reduxjs/toolkit";

import { create, update, remove, INITIAL_STATE, CacheState } from "./cache";

export const reducer = createReducer<CacheState>(INITIAL_STATE, (builder) =>
  builder
    .addCase(create, (state, action) => {
      return [...state, action.payload];
    })
    .addCase(update, (state, action) => {
      const idx = state.findIndex(
        (cache) =>
          cache.type === action.payload.type && cache.id === action.payload.id
      );
      state[idx] = action.payload;
    })
    .addCase(remove, (state) => {
      const [, ...rest] = state;
      return rest;
    })
);
