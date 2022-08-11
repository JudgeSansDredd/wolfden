import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { MouseEvent } from "react";
import Logout from "../Components/Logout";
import WolfAttacks from "../Components/WolfAttacks";
import Guest from "../Layouts/Guest";
import { ControlPanelProps } from "../Types/PropTypes";

declare function route(name: string): string;

export default function ControlPanel(props: ControlPanelProps) {
    const doWolfAttack = (e: MouseEvent<HTMLButtonElement>) => {
        const attacking = e.currentTarget.id === "start-wolf-attack";
        axios.post(route("wolf-attack"), { attacking });
    };

    const logout = (e: MouseEvent<HTMLButtonElement>) => {
        Inertia.post(route("logout"));
    };

    return (
        <Guest>
            <Head title="Control Panel" />
            <WolfAttacks />
            <Logout />
        </Guest>
    );
}
