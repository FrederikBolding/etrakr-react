import { useState } from "react";
import { TrackableType } from "@types";
import { useData } from "@hooks/useData";

interface Props {
  type: TrackableType;
  id: string;
}

export const Details = ({ type, id }: Props) => {
  const { getData } = useData();
  const [data, setData] = useState(undefined);

  getData(type, id).then((d) => setData(d));

  return <>{data && data.name}</>;
};
