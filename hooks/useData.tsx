import { getTrackableSource } from "@api/api";
import { useDispatch, useSelector } from "@store";
import { create } from "@store/cache";
import { TrackableType } from "@types";

export function useData() {
  const cache = useSelector((state) => state.cache);

  const dispatch = useDispatch();

  const getDataFromCache = (type: TrackableType, id: string) =>
    cache[type].find((c) => c.type === type && c.id === id);

  const getData = async (type: TrackableType, id: string) => {
    const cached = getDataFromCache(type, id);
    const source = getTrackableSource(type);
    if (cached) {
      return source.transform(cached);
    } else {
      const data = await source.getData(id);
      dispatch(create({ type, data }));
      return source.transform(data);
    }
  };

  return { cache, getData };
}
