import { Head } from "@inertiajs/inertia-react";
import Echo from "laravel-echo";
import React, { useState } from "react";
import RoundTimer from "../Components/RoundTimer";
import { AttackType, GameStateType } from "../Types/GameTypes";

export default function Dashboard(props: GameStateType) {
    const [gameState, setGameState] = useState<GameStateType>(props);
    const { game, round, attack } = gameState;
    if (!game || !round) {
        return <div>The game has not started</div>;
    }
    const attacking = attack && !attack.resolved;

    // Set up echo to listen to web sockets
    const key = import.meta.env.VITE_PUSHER_APP_KEY;
    const wsHost = `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`;
    console.log(key, wsHost);
    const echo = new Echo({
        broadcaster: "pusher",
        key,
        wsHost,
        wsPort: 80,
        forceTLS: true,
        enabledTransports: ["ws"],
    });

    // Listen to the wolf den channel
    echo.channel("wolf.den.channel").listen(
        "WolfAttackEvent",
        (e: { attack: AttackType }) => {
            setGameState((prev: GameStateType) => {
                return { ...prev, ...e };
            });
        }
    );

    return (
        <>
            <Head title="Dashboard" />
            <div
                className={`w-screen h-screen ${
                    attacking ? "bg-red-900 text-white" : "bg-white text-black"
                }`}
            >
                <div className="container mx-auto font-mono">
                    <div className="w-full text-center text-8xl">{`It is round ${round.round_number}`}</div>
                    <div
                        className={`text-6xl text-center mt-16 ${
                            attacking ? "" : "hidden"
                        }`}
                    >
                        A Wolf Attack is Underway.
                        <br />
                        Combatants to battle stations.
                        <br />
                        All others, shelter in place.
                    </div>
                    <RoundTimer />
                </div>
            </div>
        </>
    );
}
