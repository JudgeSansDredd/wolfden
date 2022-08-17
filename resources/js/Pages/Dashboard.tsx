import { Head } from "@inertiajs/inertia-react";
import Echo from "laravel-echo";
import React, { useState } from "react";
import ActionTimer from "../Components/Dashboard/ActionTimer";
import TeamTimer from "../Components/Dashboard/TeamTimer";
import {
    AttackType,
    GameStateType,
    GameType,
    RoundType,
} from "../Types/GameTypes";

export default function Dashboard(props: GameStateType) {
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
        })
        .listen("GameEvent", ({ game }: { game: GameType }) => {
            setGameState((prev: GameStateType) => {
                return { ...prev, game };
            });
        });

    if (!game || !round) {
        return <div>The game has not started</div>;
    }
    const attacking = attack && !attack.resolved;
    const wolfAttack = (
        <div
            className={`${
                attacking ? "" : "hidden"
            } flex text-xl border-2 border-white border-solid rounded-full my-2 animate-pulse`}
        >
            <div className="p-2 text-center text-white text-red-700 bg-white rounded-l-full">
                Wolf Attack
            </div>
            <div className="flex-grow p-2 text-center">
                Combatants to battle stations. All others, shelter in place.
            </div>
        </div>
    );

    return (
        <>
            <Head title="Dashboard" />
            <div
                className={`w-screen h-screen ${
                    attacking ? "bg-red-900 text-white" : "bg-white text-black"
                }`}
            >
                <div className="container flex flex-col h-full mx-auto font-mono">
                    <div className="w-full text-center text-8xl">{`It is round ${round.round_number}`}</div>
                    <ActionTimer round={round} />
                    <TeamTimer round={round} />
                    <div
                        className={`flex my-2 text-xl border-2 border-blue-400 border-solid rounded-full`}
                    >
                        <div className="p-2 text-lg text-center text-white bg-blue-400 rounded-l-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-20 h-10"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="flex items-center justify-center flex-grow p-2">
                            <div>Some sort of message</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-grow">
                        {wolfAttack}
                    </div>
                </div>
            </div>
        </>
    );
}
