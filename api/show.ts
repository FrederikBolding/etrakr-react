import { TrackableSource, TrackableType } from "@types";
import { tmdb } from "./tmdb";

const getData = async (id: string) => {
  const tv = await tmdb.tv.getById(id);
  return tv;
};

const transform = (show) => ({
  type: TrackableType.Show,
  id: show.id.toString(),
  name: show.name,
  description: show.overview,
});

export const show: TrackableSource = {
  type: TrackableType.Show,
  getData,
  transform,
};
