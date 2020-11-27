import { TrackableSource, TrackableType } from "@types";
import { show } from "./show";

const sources: Record<TrackableType, TrackableSource> = {
  [TrackableType.Show]: show,
};

export const getTrackableSource = (type: TrackableType) => {
  return sources[type];
};
