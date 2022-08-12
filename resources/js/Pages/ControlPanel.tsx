import { Head } from "@inertiajs/inertia-react";
import React from "react";
import Admin from "../Components/Admin";
import WolfAttacks from "../Components/WolfAttacks";
import Guest from "../Layouts/Guest";
import { GameStateType } from "../Types/GameTypes";

declare function route(name: string): string;

export default function ControlPanel(props: GameStateType) {
    return (
        <Guest>
            <Head title="Control Panel" />
            <WolfAttacks attack={props.attack} />
            <Admin />
        </Guest>
    );
}
