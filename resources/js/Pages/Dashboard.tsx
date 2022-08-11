import { Head } from "@inertiajs/inertia-react";
import Echo from "laravel-echo";
import React, { useState } from "react";
import { UpdateGameStateType } from "../Types/GameTypes";
import { DashboardProps } from "../Types/PropTypes";

export default function Dashboard(props: DashboardProps) {
    const [status, setStatus] = useState<{ attacking: Boolean }>({
        attacking: false,
    });

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

    echo.channel("wolf.den.channel").listen(
        "WolfAttackEvent",
        (e: UpdateGameStateType) => {
            console.log(e);
            setStatus((prev) => {
                return { ...prev, ...e };
            });
        }
    );

    return (
        <>
            <Head title="Dashboard" />
            <div
                className={`w-screen h-screen ${
                    status.attacking
                        ? "bg-red-900 text-white"
                        : "bg-white text-black"
                }`}
            >
                <div className="container mx-auto font-mono">
                    <div className="w-full text-center text-8xl">{`It is round ${props.roundNumber}`}</div>
                    <div
                        className={`text-6xl text-center mt-16 ${
                            status.attacking ? "" : "hidden"
                        }`}
                    >
                        A Wolf Attack is Underway.
                        <br />
                        Combatants to battle stations.
                        <br />
                        All others, shelter in place.
                    </div>
                </div>
            </div>
        </>
    );
}
