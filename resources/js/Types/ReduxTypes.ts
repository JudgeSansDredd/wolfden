import { store } from "../Redux/Store";

export type StoreType = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export interface AttackStateType {
    attacking: boolean;
}

export interface RoundStateType {
    round_number: number | null;
    action_time_ends_at: string | null;
    team_time_ends_at: string | null;
}

export interface GameStateType {
    game_created: boolean;
}
