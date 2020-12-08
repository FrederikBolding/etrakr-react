import { TrackableSource, TrackableType } from "@types";
import { movie } from "./movie";
import { show } from "./show";
import { tmdb } from "./tmdb";

const sources: Record<TrackableType, TrackableSource> = {
  [TrackableType.Show]: show,
  [TrackableType.Movie]: movie,
};

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
