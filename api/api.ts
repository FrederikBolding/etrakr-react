import { TrackableSource, TrackableType } from "@types";
import { movie } from "./movie";
import { show } from "./show";

const sources: Record<TrackableType, TrackableSource> = {
  [TrackableType.Show]: show,
  [TrackableType.Movie]: movie,
};

export const getTrackableSource = (type: TrackableType) => {
  return sources[type];
};
