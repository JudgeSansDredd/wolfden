import { DateTime } from "luxon";
import { store } from "../Redux/Store";

export type StoreType = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export interface AttackStateType {
    attacking: boolean;
}

export interface RoundStateType {
    round_number: number | null;
    action_time_ends_at: DateTime | null;
    team_time_ends_at: DateTime | null;
}
