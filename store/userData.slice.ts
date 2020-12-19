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

const defaultState = { favorite: false, dashboard: false, skipped: [], watched: [] }

const findOrCreate = (state, type, id) => {
  const idx = state[type].findIndex((t) => t.id === id);
  if (idx === -1) {
    state[type].push({ id, ...defaultState });
    return state[type].length - 1;
  }
  return idx;
}

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
      const idx = findOrCreate(state, type, id)
      state[type][idx].dashboard = dashboard;
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
      const idx = findOrCreate(state, type, id)
      state[type][idx].favorite = favorite;
    },
    setWatched(
      state,
      action: PayloadAction<{
        type: TrackableType;
        id: string;
        episode: string;
        watched: boolean;
      }>
    ) {
      const { type, id, episode, watched } = action.payload;
      const idx = findOrCreate(state, type, id)
      const currentWatched = state[type][idx].watched;
      const existingIdx = currentWatched.findIndex(e => e === episode)
      if (watched && existingIdx === -1) {
        console.log("pushing", episode)
        state[type][idx].watched.push(episode)
      } else if (existingIdx !== -1) {
        console.log("splicing", episode)
        state[type][idx].watched.splice(existingIdx)
      }
    },
    setSkipped(
      state,
      action: PayloadAction<{
        type: TrackableType;
        id: string;
        episode: string;
        skipped: boolean;
      }>
    ) {
      const { type, id, episode, skipped } = action.payload;
      const idx = findOrCreate(state, type, id)
      const currentSkipped = state[type][idx].skipped;
      const existingIdx = currentSkipped.findIndex(e => e === episode)
      if (skipped && existingIdx === -1) {
        state[type][idx].skipped.push(episode)
      } else if (existingIdx !== -1) {
        state[type][idx].skipped.splice(existingIdx)
      }
    },
  },
});

export const { setDashboardState, setFavorite, setWatched, setSkipped } = slice.actions;

export default slice;

export const getTrackable = (type: TrackableType, id: string) =>
  createSelector(
    (state: ApplicationState) => state.userData[type].find((u) => u.id === id),
    (s) => (s))
export const isOnDashboard = (type: TrackableType, id: string) =>
  createSelector(
    getTrackable(type, id),
    (s) => (s ? s.dashboard : false)
  );
export const isFavorite = (type: TrackableType, id: string) =>
  createSelector(
    getTrackable(type, id),
    (s) => (s ? s.favorite : false)
  );
export const IsEpisodeWatched = (type: TrackableType, id: string, episode: string) => createSelector(
  getTrackable(type, id),
  (s) => s && s.watched.includes(episode)
);
export const IsEpisodeSkipped = (type: TrackableType, id: string, episode: string) => createSelector(
  getTrackable(type, id),
  (s) => s && s.skipped.includes(episode)
);