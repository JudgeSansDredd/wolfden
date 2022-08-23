import { Head } from "@inertiajs/inertia-react";
import Echo from "laravel-echo";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Admin from "../Components/ControlPanel/Admin";
import RoundController from "../Components/ControlPanel/RoundController";
import WolfAttacks from "../Components/ControlPanel/WolfAttacks";
import GameMeta from "../Components/Dashboard/GameMeta";
import Guest from "../Layouts/Guest";
import { updateAttack } from "../Redux/AttackSlice";
import { updateGame } from "../Redux/GameSlice";
import { updateRound } from "../Redux/RoundSlice";
import {
    AttackAPIType,
    GameAPIType,
    GameStateAPIType,
    RoundAPIType,
} from "../Types/GameTypes";

export default function ControlPanel(props: GameStateAPIType) {
    const dispatch = useDispatch();

    useEffect(() => {
        const { game, round, attack } = props;
        dispatch(updateGame(game));
        dispatch(updateRound(round));
        dispatch(updateAttack(attack));
    }, [props]);

    useEffect(() => {
        // Listen to the wolf den channel
        const key = import.meta.env.VITE_PUSHER_APP_KEY;
        const wsHost = `ws-${
            import.meta.env.VITE_PUSHER_APP_CLUSTER
        }.pusher.com`;
        const echo = new Echo({
            broadcaster: "pusher",
            key,
            wsHost,
            wsPort: 80,
            forceTLS: true,
            enabledTransports: ["ws"],
        });
        echo.channel("wolf.den.channel")
            .listen(
                "WolfAttackEvent",
                ({ attack }: { attack: AttackAPIType }) => {
                    dispatch(updateAttack(attack));
                }
            )
            .listen("RoundEvent", ({ round }: { round: RoundAPIType }) => {
                dispatch(updateRound(round));
            })
            .listen("GameEvent", ({ game }: { game: GameAPIType }) => {
                dispatch(updateGame(game));
            });
        return () => {
            echo.leaveChannel("wolf.den.channel");
        };
    }, []);

    return (
        <Guest>
            <Head title="Control Panel" />
            <GameMeta />
            <RoundController />
            <WolfAttacks />
            <Admin />
        </Guest>
    );
}
