import { TrackableSource, TrackableType } from "@types";
import { movie, RawDataType as RawMovieDataType } from "./movie";
import { tv, RawDataType as RawTvDataType } from "./tv";
import { tmdb } from "./tmdb";

const sources: Record<TrackableType, TrackableSource> = {
  [TrackableType.Tv]: tv,
  [TrackableType.Movie]: movie,
};

export type DataType = RawTvDataType | RawMovieDataType

export const getTrackableSource = (type: TrackableType) => {
  return sources[type];
};

export const search = async (query: string) => {
  const results = await tmdb.search.getMulti({ query });
  return (
    results.results
      // @ts-expect-error media_type is present on these types
      .filter((r) => Object.values(TrackableType).includes(r.media_type))

      .map((r) =>
        // @ts-expect-error media_type is present on these types
        getTrackableSource(r.media_type as TrackableType).transformSearch(r)
      )
  );
};
