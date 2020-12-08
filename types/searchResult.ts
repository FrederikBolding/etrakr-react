import { TrackableType } from "./trackableType";

export interface SearchResult {
    type: TrackableType;
    id: string;
    name: string;
}