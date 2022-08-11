import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { MouseEvent } from "react";
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
        <>
            <Head title={props.title} />
            <div>This is a control panel</div>
            <button id="start-wolf-attack" onClick={doWolfAttack}>
                Start Wolf Attack
            </button>
            <button id="stop-wolf-attack" onClick={doWolfAttack}>
                Stop Wolf Attack
            </button>
            <button id="logout" onClick={logout}>
                Logout
            </button>
        </>
    );
}
