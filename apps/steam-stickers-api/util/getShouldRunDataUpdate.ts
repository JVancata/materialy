import { RUN_INTERVAL_MS } from "../const.ts";
import { isBefore } from "./isBefore.ts";

export const getShouldRunDataUpdate = (lastUpdated: Date | undefined): boolean => {
    if (!lastUpdated) return true;

    const desiredRunDate = new Date(lastUpdated.getTime() + RUN_INTERVAL_MS);
    const shouldRun = isBefore(desiredRunDate, new Date());
    if (!shouldRun) return false;

    return true;
}