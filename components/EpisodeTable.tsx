import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Center, Checkbox, IconButton, TableContainerProps } from "@chakra-ui/react";
import { SeasonData, TrackableType } from "@types";
import { formatEpisode } from "@utils";
import React, { useMemo } from "react";
import { TableComponent } from "./Table";
import { WatchedCheckbox } from "./WatchedCheckbox";

interface Props {
  type: TrackableType;
  id: string;
  seasons: SeasonData[];
}

export const EpisodeTable = ({ type, id, seasons, ...props }: Props & TableContainerProps) => {
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
        Cell: ({ row: { original: { id: episode }} }) =>  <WatchedCheckbox type={type} id={id} episode={episode} /> ,
      },
    ],
    []
  );

  const data = useMemo(
    () => seasons.reduce((acc, season) => [...acc, ...season.episodes.map(episode => ({ ...episode, episode: formatEpisode(episode.season, episode.episode) }))], []),
    [seasons]
  );

  return <TableComponent columns={columns} data={data} {...props} />;
};
