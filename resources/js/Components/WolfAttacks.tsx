import axios from "axios";
import React, { MouseEvent } from "react";
import Button from "./Button";
import Label from "./Label";

declare function route(name: string): string;

export default function WolfAttacks() {
    const doWolfAttack = (e: MouseEvent<HTMLButtonElement>) => {
        const attacking = e.currentTarget.id === "start-wolf-attack";
        axios.post(route("wolf-attack"), { attacking });
    };
    return (
        <div>
            <Label className="" children="" forInput="" value="Wolf Attacks" />
            <Button
                type="button"
                className="mx-1 bg-red-400 active:bg-red-900"
                processing={false}
                onClick={doWolfAttack}
                id="start-wolf-attack"
            >
                Start Wolf Attack
            </Button>
            <Button
                type="button"
                className="mx-1"
                processing={false}
                onClick={doWolfAttack}
                id="end-wolf-attack"
            >
                End Wolf Attack
            </Button>
        </div>
    );
}
