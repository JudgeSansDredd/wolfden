import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { AttackStateType } from "../Types/ReduxTypes";

const initialState: AttackStateType = { attacking: false };
export const attackSlice = createSlice({
    name: "attack",
    initialState,
    reducers: {
        beginAttack: (state) => {
            state.attacking = true;
        },
        endAttack: (state) => {
            state.attacking = false;
        },
        somethingWithValue: (state, action: PayloadAction<number>) => {
            // TODO: Remove this useless reducer
            state.attacking = action.payload > 0;
        },
    },
});

export const { beginAttack, endAttack, somethingWithValue } =
    attackSlice.actions;
export default attackSlice.reducer;
