import { Head } from "@inertiajs/inertia-react";
import Echo from "laravel-echo";
import { DateTime } from "luxon";
import React, { useState } from "react";
import Admin from "../Components/ControlPanel/Admin";
import RoundController from "../Components/ControlPanel/RoundController";
import WolfAttacks from "../Components/ControlPanel/WolfAttacks";
import Guest from "../Layouts/Guest";
import {
    AttackAPIType,
    GameAPIType,
    GameStateAPIType,
    RoundAPIType,
} from "../Types/GameTypes";

export default function ControlPanel(props: GameStateAPIType) {
    const [gameState, setGameState] = useState<GameStateAPIType>(props);
    const { round, attack } = gameState;

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
        .listen("WolfAttackEvent", ({ attack }: { attack: AttackAPIType }) => {
            setGameState((prev: GameStateAPIType) => {
                return { ...prev, attack };
            });
        })
        .listen("RoundEvent", ({ round }: { round: RoundAPIType }) => {
            setGameState((prev: GameStateAPIType) => {
                return { ...prev, round };
            });
        })
        .listen("GameEvent", ({ game }: { game: GameAPIType }) => {
            setGameState((prev: GameStateAPIType) => {
                return { ...prev, game };
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
