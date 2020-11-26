import { useState } from "react";
import { tmdb } from "@api";
import { TrackableType } from "@types";

interface Props {
  type: TrackableType;
  id: string;
}

export const Details = ({ type, id }: Props) => {
  const [data, setData] = useState(undefined);

  tmdb.tv.getById(parseInt(id, 10)).then((s) => setData(s));
  return <>{data && data.name}</>;
};
