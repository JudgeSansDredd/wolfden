import { Head } from "@inertiajs/inertia-react";
import Echo from "laravel-echo";
import { DateTime } from "luxon";
import React, { useState } from "react";
import Admin from "../Components/Admin";
import RoundController from "../Components/RoundController";
import WolfAttacks from "../Components/WolfAttacks";
import Guest from "../Layouts/Guest";
import { AttackType, GameStateType, RoundType } from "../Types/GameTypes";

declare function route(name: string): string;

export default function ControlPanel(props: GameStateType) {
    const [gameState, setGameState] = useState<GameStateType>(props);
    const { game, round, attack } = gameState;

    // Set up echo to listen to web sockets
    const key = import.meta.env.VITE_PUSHER_APP_KEY;
    const wsHost = `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`;
    const echo = new Echo({
        broadcaster: "pusher",
        key,
        wsHost,
        wsPort: 80,
        forceTLS: true,
        enabledTransports: ["ws"],
    });

    // Listen to the wolf den channel
    echo.channel("wolf.den.channel")
        .listen("WolfAttackEvent", ({ attack }: { attack: AttackType }) => {
            setGameState((prev: GameStateType) => {
                return { ...prev, attack };
            });
        })
        .listen("RoundEvent", ({ round }: { round: RoundType }) => {
            setGameState((prev: GameStateType) => {
                return { ...prev, round };
            });
        });

    const roundUnderway = round
        ? DateTime.now() < DateTime.fromISO(round.action_time_ends_at)
        : false;

    return (
        <Guest>
            <Head title="Control Panel" />
            <RoundController round={round} />
            <WolfAttacks roundUnderway={roundUnderway} attack={attack} />
            <Admin />
        </Guest>
    );
}
