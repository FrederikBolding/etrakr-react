import { TrackableSource, TrackableType } from "@types";
import { tmdb } from "./tmdb";

const getData = async (id: string) => {
  const movie = await tmdb.movies.getById(id);
  return { ...movie, name: movie.title, type: TrackableType.Movie, id };
};

export const movie: TrackableSource = {
  type: TrackableType.Movie,
  getData,
};
