import { TrackableType } from "./trackableType";

export interface TrackableData {
    type: TrackableType;
    id: string;
    name: string;
    description: string;
    genres: string[];
    runtime?: number;
    poster: string;
    seasons?: SeasonData[];
}

export interface SeasonData {
    season: number;
    name: string;
    description: string;
    episodes: EpisodeData[];
}

export interface EpisodeData {
    episode: number;
    season: number;
    name: string;
    description: string;
    airDate?: string;
}