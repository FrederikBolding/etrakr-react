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
  const results = await tmdb.search.getMulti({ query })
  // @todo transform
  return results.results; 
}
