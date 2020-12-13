import padStart from "lodash/padStart";

export const formatEpisode = (season: number, episode: number) =>
  `S${padStart(season.toString(), 2, "0")}E${padStart(
    episode.toString(),
    2,
    "0"
  )}`;
