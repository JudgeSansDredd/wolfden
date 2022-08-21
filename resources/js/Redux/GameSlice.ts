import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameAPIType } from "../Types/GameTypes";
import { GameStateType } from "../Types/ReduxTypes";

const initialState: GameStateType = {
    game_created: false,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        updateGame: (state, action: PayloadAction<GameAPIType | null>) => {
            state.game_created = action.payload !== null;
        },
    },
});

export const { updateGame } = gameSlice.actions;
export default gameSlice.reducer;
