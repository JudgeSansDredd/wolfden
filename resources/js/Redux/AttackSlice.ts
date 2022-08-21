import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttackAPIType } from "../Types/GameTypes";
import { AttackStateType } from "../Types/ReduxTypes";

const initialState: AttackStateType = { attacking: false };
export const attackSlice = createSlice({
    name: "attack",
    initialState,
    reducers: {
        updateAttack: (state, action: PayloadAction<AttackAPIType | null>) => {
            state.attacking =
                action.payload !== null && !action.payload.resolved;
        },
    },
});

export const { updateAttack } = attackSlice.actions;
export default attackSlice.reducer;
