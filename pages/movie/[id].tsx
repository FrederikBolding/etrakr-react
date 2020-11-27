import { Details } from "../details/_details";

import { useRouter } from "next/router";
import { TrackableType } from "@types";

export default function MovieDetails() {
  return <Details type={TrackableType.Movie} />;
}
