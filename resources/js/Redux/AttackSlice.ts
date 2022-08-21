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
    },
});

export const { beginAttack, endAttack } = attackSlice.actions;
export default attackSlice.reducer;
