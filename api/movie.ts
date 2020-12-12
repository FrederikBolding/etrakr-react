import { AsyncReturnType, TrackableSource, TrackableType } from "@types";
import { MovieListResult } from "themoviedb-typescript/build/src/interfaces/generic";
import { tmdb } from "./tmdb";

const getData = async (id: string) => {
  const movie = await tmdb.movies.getById(id);
  return { ...movie, id };
};

export type RawDataType = AsyncReturnType<typeof getData>;

const transform = (movie: RawDataType) => ({
  type: TrackableType.Movie,
  id: movie.id.toString(),
  // @ts-expect-error This does exist, the type is wrong
  name: movie.title,
  description: movie.overview,
  genres: movie.genres.map(g => g.name),
  poster: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
  runtime: movie.runtime
});

const transformSearch = (movie: MovieListResult) => ({
  type: TrackableType.Movie,
  id: movie.id.toString(),
  name: movie.title
});

export const movie: TrackableSource = {
  type: TrackableType.Movie,
  getData,
  transform,
  transformSearch
};
