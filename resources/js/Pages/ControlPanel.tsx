import { Head } from "@inertiajs/inertia-react";
import { DateTime } from "luxon";
import React, { useState } from "react";
import Admin from "../Components/Admin";
import RoundController from "../Components/RoundController";
import WolfAttacks from "../Components/WolfAttacks";
import Guest from "../Layouts/Guest";
import { GameStateType } from "../Types/GameTypes";

declare function route(name: string): string;

export default function ControlPanel(props: GameStateType) {
    const [gameState, setGameState] = useState<GameStateType>(props);
    const { round, attack } = gameState;

    const updateGameState = (newState: Partial<GameStateType>): void => {
        setGameState((prev) => {
            return { ...prev, ...newState };
        });
    };

    const roundUnderway = round
        ? DateTime.now() < DateTime.fromISO(round.action_time_ends_at)
        : false;

    return (
        <Guest>
            <Head title="Control Panel" />
            <RoundController round={round} updateGameState={updateGameState} />
            <WolfAttacks roundUnderway={roundUnderway} attack={attack} />
            <Admin />
        </Guest>
    );
}
