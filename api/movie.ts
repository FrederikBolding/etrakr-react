import { TrackableSource, TrackableType } from "@types";
import { Movie } from "themoviedb-typescript/build/src/interfaces/movies";
import { tmdb } from "./tmdb";

const getData = async (id: string) => {
  const movie = await tmdb.movies.getById(id);
  return movie;
};

const transform = (movie: Movie) => ({
  type: TrackableType.Movie,
  id: movie.id.toString(),
  // @ts-expect-error This does exist, the type is wrong
  name: movie.title,
  description: movie.overview,
  genres: movie.genres.map(g => g.name),
  poster: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
  runtime: movie.runtime
});

export const movie: TrackableSource = {
  type: TrackableType.Movie,
  getData,
  transform
};
