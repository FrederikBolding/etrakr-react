import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trackable, TrackableType } from "@types";
import { ApplicationState } from "./store";

export type UserDataState = {
  [key in TrackableType]: Trackable[];
};

export const initialState: UserDataState = {
  [TrackableType.Tv]: [],
  [TrackableType.Movie]: [],
};

const slice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setDashboardState(
      state,
      action: PayloadAction<{
        type: TrackableType;
        id: string;
        dashboard: boolean;
      }>
    ) {
      const { type, id, dashboard } = action.payload;
      const idx = state[type].findIndex((t) => t.id === id);
      if (idx === -1) {
        state[type].push({ id, favorite: false, dashboard: dashboard });
      } else {
        state[type][idx].dashboard = dashboard;
      }
    },
    setFavorite(
      state,
      action: PayloadAction<{
        type: TrackableType;
        id: string;
        favorite: boolean;
      }>
    ) {
      const { type, id, favorite } = action.payload;
      const idx = state[type].findIndex((t) => t.id === id);
      if (idx === -1) {
        state[type].push({ id, favorite: favorite, dashboard: false });
      } else {
        state[type][idx].favorite = favorite;
      }
    },
  },
});

export const { setDashboardState, setFavorite } = slice.actions;

export default slice;

export const isOnDashboard = (type: TrackableType, id: string) =>
  createSelector(
    (state: ApplicationState) => state.userData[type].find((u) => u.id === id),
    (s) => (s ? s.dashboard : false)
  );
export const isFavorite = (type: TrackableType, id: string) =>
  createSelector(
    (state: ApplicationState) => state.userData[type].find((u) => u.id === id),
    (s) => (s ? s.favorite : false)
  );
