import {
  AsyncReturnType,
  EpisodeData,
  SeasonData,
  TrackableData,
  TrackableSource,
  TrackableType,
} from "@types";
import { mapAsync } from "@utils";
import { Episode, TvResult, TvSeasonResponse } from "moviedb-promise/dist/request-types";
import { tmdb } from "./tmdb";

const getData = async (id: string) => {
  const parsedId = parseInt(id, 10);
  const tv = await tmdb.tvInfo(parsedId);
  const seasons: TvSeasonResponse[] = await mapAsync(tv.seasons, (season) =>
    tmdb.seasonInfo({ id: parsedId, season_number: season.season_number })
  );
  return { ...tv, id, seasons };
};

export type RawDataType = AsyncReturnType<typeof getData>;

const transform = (show: RawDataType): TrackableData => ({
  type: TrackableType.Tv,
  id: show.id.toString(),
  name: show.name,
  description: show.overview,
  genres: show.genres.map((g) => g.name),
  poster: `https://image.tmdb.org/t/p/w300/${show.poster_path}`,
  runtime: show.episode_run_time[0],
  seasons: show.seasons.filter((s) => s.season_number > 0).map(transformSeason),
  startDate: show.first_air_date,
  endDate: show.last_air_date,
});

const transformSeason = (season: TvSeasonResponse): SeasonData => ({
  id: season.id.toString(),
  season: season.season_number,
  name: season.name,
  description: season.overview,
  episodes: season.episodes.map(transformEpisode),
});

const transformEpisode = (episode: Episode): EpisodeData => ({
  id: episode.id.toString(),
  episode: episode.episode_number,
  season: episode.season_number,
  name: episode.name,
  description: episode.name,
  airDate: episode.air_date,
});

const transformSearch = (show: TvResult) => ({
  type: TrackableType.Tv,
  id: show.id.toString(),
  name: show.name,
});

export const tv: TrackableSource = {
  type: TrackableType.Tv,
  getData,
  transform,
  transformSearch,
};
