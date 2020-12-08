import { TrackableType } from "@types";

export const buildRoute = (type: TrackableType, id: string) => `/${type}/${id}`