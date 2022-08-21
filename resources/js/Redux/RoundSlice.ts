import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { RoundAPIType } from "../Types/GameTypes";
import { RoundStateType } from "../Types/ReduxTypes";

const initialState: RoundStateType = {
    round_number: null,
    action_time_ends_at: null,
    team_time_ends_at: null,
};

export const roundSlice = createSlice({
    name: "round",
    initialState,
    reducers: {
        updateRound: (state, action: PayloadAction<RoundAPIType | null>) => {
            if (action.payload) {
                const { round_number, action_time_ends_at, team_time_ends_at } =
                    action.payload;
                state.round_number = round_number;
                state.action_time_ends_at =
                    DateTime.fromISO(action_time_ends_at);
                state.team_time_ends_at = DateTime.fromISO(team_time_ends_at);
            }
        },
    },
});

export const { updateRound } = roundSlice.actions;
export default roundSlice.reducer;
