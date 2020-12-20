import { Button, Link as UILink } from "@chakra-ui/react";
import { useData } from "@hooks/useData";
import { getOnDashboard, isEpisodeWatched, useSelector } from "@store";
import { Trackable, TrackableType } from "@types";
import { buildRoute, formatEpisode, mapAsync } from "@utils";
import Link from "next/link";
import React, { useMemo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useAsyncMemo } from "use-async-memo";
import { TableComponent } from "../Table";

const MovieDashboardTable = ({
  isEpisodeWatched,
}: ConnectedProps<typeof connector>) => {
  const type = TrackableType.Movie;
  const trackables = useSelector(getOnDashboard(type));
  const { getData } = useData();
  const columns = useMemo(
    () => [
      {
        Header: "Movie",
        accessor: "name",
        Cell: ({
          row: {
            original: { name, id },
          },
        }) => (
          <Link href={buildRoute(type, id)}>
            <UILink>{name}</UILink>
          </Link>
        ),
      },
      {
        Header: "Release Date",
        accessor: "startDate",
      },
      {
        Header: "Actions",
        center: true,
        Cell: ({}) => <Button>Watched</Button>,
      },
    ],
    []
  );

  const data = useAsyncMemo(
    () =>
      mapAsync(trackables, async (t) => {
        const data = await getData(type, t.id);
        return data;
      }),
    // @fixme
    [JSON.stringify(trackables)],
    []
  );

  return <TableComponent columns={columns} data={data} />;
};

const mapStateToProps = (state) => ({
  isEpisodeWatched: (type, id, episode) =>
    isEpisodeWatched(type, id, episode)(state),
});

const connector = connect(mapStateToProps);
export default connector(MovieDashboardTable);
