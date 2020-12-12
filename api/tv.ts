import { AsyncReturnType, TrackableData, TrackableSource, TrackableType } from "@types";
import { mapAsync } from "@utils";
import { TVListResult } from "themoviedb-typescript/build/src/interfaces/generic";
import { SeasonWithEpisodes, Show } from "themoviedb-typescript/build/src/interfaces/tv";
import { tmdb } from "./tmdb";

const getData = async (id: string) => {
  const tv = await tmdb.tv.getById(id);
  const seasons: SeasonWithEpisodes[] = await mapAsync(tv.seasons, (season) => tmdb.tvSeasons.getById(id, season.season_number))
  return { ...tv, id, seasons };
};

export type RawDataType = AsyncReturnType<typeof getData>;

const transform = (show: RawDataType): TrackableData => ({
  type: TrackableType.Tv,
  id: show.id.toString(),
  name: show.name,
  description: show.overview,
  genres: show.genres.map(g => g.name),
  poster: `https://image.tmdb.org/t/p/w300/${show.poster_path}`,
  runtime: show.episode_run_time[0],
  seasons: show.seasons
});

const transformSearch = (show: TVListResult) => ({
  type: TrackableType.Tv,
  id: show.id.toString(),
  name: show.name
});

export const tv: TrackableSource = {
  type: TrackableType.Tv,
  getData,
  transform,
  transformSearch
};
