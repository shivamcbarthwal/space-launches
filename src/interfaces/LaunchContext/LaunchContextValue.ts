import { Launch } from "../Launch";
import { LaunchData } from "../LaunchData";

export interface LaunchContextValue {
    launches: Launch[] | undefined;
    fetchLaunches: (url: string) => Promise<LaunchData>;
    next: string | null;
    previous: string | null;
    setLaunchesFromCache: (cachedLaunches: Launch[]) => void;
}