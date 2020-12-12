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
    name: string;
    description: string;
    episodes: EpisodeData[];
}

export interface EpisodeData {
    name: string;
    description: string;
    airDate?: string;
}