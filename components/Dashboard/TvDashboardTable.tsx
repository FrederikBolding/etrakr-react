import { Button, Link as UILink } from "@chakra-ui/react";
import { NO_EPISODE_ID } from "@config";
import { useData } from "@hooks/useData";
import { AnyAction, bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { getOnDashboard, isEpisodeWatched, setWatched } from "@store";
import { TrackableType } from "@types";
import { buildRoute, formatEpisode, mapAsync } from "@utils";
import Link from "next/link";
import React, { useMemo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useAsyncMemo } from "use-async-memo";
import { TableComponent } from "../Table";

const DashboardTable = ({
  isEpisodeWatched,
  getOnDashboard,
  setWatched,
}: ConnectedProps<typeof connector>) => {
  const type = TrackableType.Tv;
  const trackables = getOnDashboard(type);
  const { getData } = useData();
  const columns = useMemo(
    () => [
      {
        Header: "Show",
        accessor: "show",
        Cell: ({
          row: {
            original: { show, id },
          },
        }) => (
          <Link href={buildRoute(type, id)}>
            <UILink>{show}</UILink>
          </Link>
        ),
      },
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
        Header: "Actions",
        center: true,
        Cell: ({
          row: {
            original: { id, epId: episode },
          },
        }) =>
          episode !== NO_EPISODE_ID ? (
            <Button
              onClick={() => setWatched({ type, id, episode, watched: true })}
            >
              Watched
            </Button>
          ) : (
            <>No more episodes</>
          ),
      },
    ],
    []
  );

  const data = useAsyncMemo(
    () =>
      mapAsync(trackables, async (t) => {
        const data = await getData(type, t.id);
        const episodes = data.seasons.reduce(
          (acc, season) => [...acc, ...season.episodes],
          []
        );
        const nextEpisode = episodes.find(
          (e) => !isEpisodeWatched(type, data.id, e.id)
        );
        return {
          show: data.name,
          ...nextEpisode,
          epId: nextEpisode ? nextEpisode.id : NO_EPISODE_ID,
          id: t.id,
          episode:
            nextEpisode &&
            formatEpisode(nextEpisode.season, nextEpisode.episode),
        };
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
  getOnDashboard: (type) => getOnDashboard(type)(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setWatched: setWatched,
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(DashboardTable);
