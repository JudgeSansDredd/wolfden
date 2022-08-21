import { configureStore } from "@reduxjs/toolkit";
import attackReducer from "./AttackSlice";
import roundReducer from "./RoundSlice";

export const store = configureStore({
    reducer: {
        attack: attackReducer,
        round: roundReducer,
    },
});
