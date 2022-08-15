import { AxiosError } from "axios";
import { DateTime } from "luxon";

export function getErrorMessage(e: AxiosError): string {
    if (e.response && typeof e.response.data === "string") {
        return e.response.data;
    } else {
        return e.message;
    }
}

export function getTimerString(target: DateTime): string {
    const now = DateTime.now();
    if (target < now) {
        return "00m 00s";
    }
    const { minutes, seconds } = target.diff(now, ["minutes", "seconds"]);
    const minuteString = minutes < 10 ? `0${minutes}` : minutes.toString();
    const secondString =
        seconds < 10
            ? `0${Math.floor(seconds)}`
            : Math.floor(seconds).toString();
    return `${minuteString}m ${secondString}s`;
}
