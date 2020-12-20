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
    startDate: string;
    endDate: string;
}

export interface SeasonData {
    id: string;
    season: number;
    name: string;
    description: string;
    episodes: EpisodeData[];
}

export interface EpisodeData {
    id: string;
    episode: number;
    season: number;
    name: string;
    description: string;
    airDate?: string;
}