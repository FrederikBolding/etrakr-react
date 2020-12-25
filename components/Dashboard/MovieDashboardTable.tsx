import { Button, Link as UILink } from "@chakra-ui/react";
import { MOVIE_EPISODE_ID } from "@config";
import { useData } from "@hooks/useData";
import { AnyAction, bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import {
  getOnDashboard,
  isEpisodeWatched,
  setWatched,
  useSelector,
} from "@store";
import { Trackable, TrackableType } from "@types";
import { buildRoute, formatEpisode, mapAsync } from "@utils";
import Link from "next/link";
import React, { useMemo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useAsyncMemo } from "use-async-memo";
import { TableComponent } from "../Table";

const MovieDashboardTable = ({
  isEpisodeWatched,
  setWatched,
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
        Cell: ({
          row: {
            original: { id },
          },
        }) => (
          <Button
            onClick={() =>
              setWatched({ type, id, episode: MOVIE_EPISODE_ID, watched: true })
            }
          >
            Watched
          </Button>
        ),
      },
    ],
    []
  );

  const data = useAsyncMemo(
    () =>
      mapAsync(
        trackables.filter(
          (t) => !isEpisodeWatched(type, t.id, MOVIE_EPISODE_ID)
        ),
        async (t) => {
          const data = await getData(type, t.id);
          return data;
        }
      ),
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setWatched: setWatched,
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(MovieDashboardTable);
