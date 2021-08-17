import { AsyncReturnType, TrackableSource, TrackableType } from "@types";
import { MovieResult } from "moviedb-promise/dist/request-types";
import { tmdb } from "./tmdb";

const getData = async (id: string) => {
  const movie = await tmdb.movieInfo(parseInt(id, 10));
  return { ...movie, id };
};

export type RawDataType = AsyncReturnType<typeof getData>;

const transform = (movie: RawDataType) => ({
  type: TrackableType.Movie,
  id: movie.id.toString(),
  name: movie.title,
  description: movie.overview,
  genres: movie.genres.map((g) => g.name),
  poster: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
  runtime: movie.runtime,
  startDate: movie.release_date,
  endDate: movie.release_date
});

const transformSearch = (movie: MovieResult) => ({
  type: TrackableType.Movie,
  id: movie.id.toString(),
  name: movie.title,
});

export const movie: TrackableSource = {
  type: TrackableType.Movie,
  getData,
  transform,
  transformSearch,
};
