import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Center, Checkbox, IconButton } from "@chakra-ui/react";
import { SeasonData } from "@types";
import { formatEpisode } from "@utils";
import React, { useMemo } from "react";
import { TableComponent } from "./Table";

interface Props {
    seasons: SeasonData[];
}

export const EpisodeTable = ({ seasons }: Props) => {
  const columns = useMemo(
    () => [
      {
        Header: "Episode",
        accessor: "episode",
      },
      {
        Header: "Title",
        accessor: "name",
      },
      {
        Header: "Air Date",
        accessor: "airDate",
      },
      {
        Header: "Watched",
        center: true,
        Cell: () => <Checkbox />,
      },
    ],
    []
  );

  const data = useMemo(
    () => seasons.reduce((acc, season) => [...acc, ...season.episodes.map(episode => ({ ...episode, episode: formatEpisode(episode.season, episode.episode)}))], []),
    [seasons]
  );

  return <TableComponent columns={columns} data={data} />;
};
