import { Button, Link as UILink } from "@chakra-ui/react";
import { useData } from "@hooks/useData";
import { isEpisodeWatched, useSelector } from "@store";
import { Trackable, TrackableType } from "@types";
import { buildRoute, formatEpisode, mapAsync } from "@utils";
import Link from "next/link";
import React, { useMemo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useAsyncMemo } from "use-async-memo"
import { TableComponent } from "./Table";

interface Props {
    type: TrackableType;
    trackables: Trackable[];
}

const DashboardTable = ({ type, trackables, isEpisodeWatched }: Props & ConnectedProps<typeof connector>) => {
    const { getData } = useData();
    const columns = useMemo(
        () => [
            {
                Header: 'Show',
                accessor: 'show',
                Cell: ({ row: { original: { show, id } } }) => <Link href={buildRoute(type, id)}><UILink>{show}</UILink></Link>,
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
                Cell: ({ }) => <Button>Watched</Button>,
            },
        ],
        []
    );

    const data = useAsyncMemo(
        () => mapAsync(trackables, async (t) => {
            const data = await getData(type, t.id);
            const episodes = data.seasons.reduce((acc, season) => [...acc, ...season.episodes], [])
            const nextEpisode = episodes.find(e => !isEpisodeWatched(type, data.id, e.id));
            return { show: data.name, ...nextEpisode, id: t.id, episode: formatEpisode(nextEpisode.season, nextEpisode.episode) }
        }),
        [trackables]
    ) || [];

    return <TableComponent columns={columns} data={data} />;
};

const mapStateToProps = (state) => ({
    isEpisodeWatched: (type, id, episode) => isEpisodeWatched(type, id, episode)(state),
});

const connector = connect(mapStateToProps);
export default connector(DashboardTable)