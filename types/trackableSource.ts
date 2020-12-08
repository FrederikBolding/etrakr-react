import { SearchResult } from "./searchResult";
import { TrackableData } from "./trackableData";
import { TrackableType } from "./trackableType";

export interface TrackableSource {
    type: TrackableType;
    getData: (id: string) => Promise<TrackableData>
    transform: (data) => TrackableData,
    transformSearch: (data) => SearchResult
}