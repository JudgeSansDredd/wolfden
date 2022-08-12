import axios from "axios";
import React, { MouseEvent } from "react";
import { AttackType } from "../Types/GameTypes";
import Button from "./Button";

declare function route(name: string): string;
interface PropType {
    attack: AttackType | null;
}
export default function WolfAttacks({ attack }: PropType) {
    const attackUnderway = (attack && !attack.resolved) || false;

    const doWolfAttack = (e: MouseEvent<HTMLButtonElement>) => {
        const attacking = e.currentTarget.id === "start-wolf-attack";
        axios.post(route("wolf-attack"), { attacking });
    };
    return (
        <div className="grid grid-cols-2 p-2 border-2 border-black rounded-lg">
            <div className="col-span-2">Wolf Attacks</div>
            <div className="flex flex-col">
                <Button
                    type="button"
                    className="my-1"
                    processing={attackUnderway}
                    onClick={doWolfAttack}
                    id="start-wolf-attack"
                >
                    Start Wolf Attack
                </Button>
                <Button
                    type="button"
                    className="my-1"
                    processing={!attackUnderway}
                    onClick={doWolfAttack}
                    id="end-wolf-attack"
                >
                    End Wolf Attack
                </Button>
            </div>
            <div className="flex items-center justify-center">
                {attackUnderway ? "Attack Underway" : "No Attack"}
            </div>
        </div>
    );
}
