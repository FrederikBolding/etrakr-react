import { TrackableType } from "./trackableType";

export interface TrackableData {
    type: TrackableType;
    id: string;
    name: string;
    description: string;
    genres: string[];
    runtime?: number;
    poster: string;
}