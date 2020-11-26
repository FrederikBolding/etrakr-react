import { useState } from "react";
import { tmdb } from "../api/tmdb";

export default function Dashboard() {
  const [show, setShow] = useState(undefined);

  tmdb.tv.getById(1337).then((s) => setShow(s));
  return <>{show && show.name}</>;
}
