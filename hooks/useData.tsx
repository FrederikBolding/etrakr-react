import { getTrackableSource } from "@api/api";
import { useDispatch, useSelector } from "@store";
import { create } from "@store/cache";
import { TrackableType } from "@types";

export function useData() {
  const cache = useSelector((state) => state.cache);

  const dispatch = useDispatch();

  const getDataFromCache = (type: TrackableType, id: string) =>
    cache.find((c) => c.type === type && c.id === id);

  const getData = async (type: TrackableType, id: string) => {
    const cached = getDataFromCache(type, id);
    if (cached) {
      return cached;
    } else {
      const data = await getTrackableSource(type).getData(id);
      dispatch(create(data));
      return data;
    }
  };

  return { cache, getData };
}
