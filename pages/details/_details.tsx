import { useState } from "react";
import { TrackableType } from "@types";
import { useData } from "@hooks/useData";
import { useRouter } from "next/router";

interface Props {
  type: TrackableType;
  id: string;
}

export const Details = ({ type }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const { getData } = useData();
  const [data, setData] = useState(undefined);

  getData(type, id as string).then((d) => setData(d));

  return <>{data && data.name}</>;
};
