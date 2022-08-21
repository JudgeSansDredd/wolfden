import { configureStore } from "@reduxjs/toolkit";
import attackReducer from "./AttackSlice";

export const store = configureStore({
    reducer: {
        attack: attackReducer,
    },
});
