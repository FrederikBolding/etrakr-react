import { TrackableSource, TrackableType } from "@types";
import { tmdb } from "./tmdb";

const getData = async (id: string) => {
  const movie = await tmdb.movies.getById(id);
  return movie;
};

const transform = (movie) => ({
  type: TrackableType.Movie,
  id: movie.id.toString(),
  name: movie.title,
  description: movie.overview
});

export const movie: TrackableSource = {
  type: TrackableType.Movie,
  getData,
  transform
};
