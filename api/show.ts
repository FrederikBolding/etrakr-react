import { TrackableSource, TrackableType } from "@types";
import { TVListResult } from "themoviedb-typescript/build/src/interfaces/generic";
import { Show } from "themoviedb-typescript/build/src/interfaces/tv";
import { tmdb } from "./tmdb";

const getData = async (id: string) => {
  const tv = await tmdb.tv.getById(id);
  return tv;
};

const transform = (show: Show) => ({
  type: TrackableType.Show,
  id: show.id.toString(),
  name: show.name,
  description: show.overview,
  genres: show.genres.map(g => g.name),
  poster: `https://image.tmdb.org/t/p/w300/${show.poster_path}`,
  runtime: show.episode_run_time[0]
});

const transformSearch = (show: TVListResult) => ({
  type: TrackableType.Show,
  id: show.id.toString(),
  name: show.name
});

export const show: TrackableSource = {
  type: TrackableType.Show,
  getData,
  transform,
  transformSearch
};
