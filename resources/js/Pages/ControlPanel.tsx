import { Head } from "@inertiajs/inertia-react";
import React from "react";
import Admin from "../Components/Admin";
import RoundController from "../Components/RoundController";
import WolfAttacks from "../Components/WolfAttacks";
import Guest from "../Layouts/Guest";
import { GameStateType } from "../Types/GameTypes";

declare function route(name: string): string;

export default function ControlPanel(props: GameStateType) {
    // TODO: Calculate if there is a round underway
    const roundUnderway = true;
    return (
        <Guest>
            <Head title="Control Panel" />
            <RoundController />
            <WolfAttacks roundUnderway={roundUnderway} attack={props.attack} />
            <Admin />
        </Guest>
    );
}
