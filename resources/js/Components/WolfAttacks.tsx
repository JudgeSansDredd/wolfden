import axios from "axios";
import React, { MouseEvent } from "react";
import { AttackType } from "../Types/GameTypes";
import Button from "./Button";

declare function route(name: string): string;
interface PropType {
    attack: AttackType | null;
    roundUnderway: boolean;
}
export default function WolfAttacks({ attack, roundUnderway }: PropType) {
    const attackUnderway = (attack && !attack.resolved) || false;

    const doWolfAttack = (e: MouseEvent<HTMLButtonElement>) => {
        const attacking = e.currentTarget.id === "start-wolf-attack";
        axios.post(route("wolf-attack"), { attacking });
    };

    let statusMessage: string;
    if (!roundUnderway) {
        statusMessage = "Between Rounds";
    } else {
        statusMessage = attackUnderway ? "Attack Underway" : "No Attack";
    }
    return (
        <div className="grid grid-cols-2 p-2 border-2 border-black rounded-b-lg">
            <div className="col-span-2">Wolf Attacks</div>
            <div className="flex flex-col">
                <Button
                    type="button"
                    className="my-1"
                    disabled={!roundUnderway || attackUnderway}
                    onClick={doWolfAttack}
                    id="start-wolf-attack"
                >
                    Start Wolf Attack
                </Button>
                <Button
                    type="button"
                    className="my-1"
                    disabled={!roundUnderway || !attackUnderway}
                    onClick={doWolfAttack}
                    id="end-wolf-attack"
                >
                    End Wolf Attack
                </Button>
            </div>
            <div className="flex items-center justify-center">
                {statusMessage}
            </div>
        </div>
    );
}
