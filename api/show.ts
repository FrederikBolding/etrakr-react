import { TrackableSource, TrackableType } from "@types";
import { tmdb } from "./tmdb";

const getData = async (id: string) => {
  const tv = await tmdb.tv.getById(id);
  return { ...tv, type: TrackableType.Show, id };
};

export const show: TrackableSource = {
  type: TrackableType.Show,
  getData,
};
