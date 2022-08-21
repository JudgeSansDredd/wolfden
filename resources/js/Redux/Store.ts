import { configureStore } from "@reduxjs/toolkit";
import attackReducer from "./AttackSlice";
import gameReducer from "./GameSlice";
import roundReducer from "./RoundSlice";

export const store = configureStore({
    reducer: {
        game: gameReducer,
        round: roundReducer,
        attack: attackReducer,
    },
});
