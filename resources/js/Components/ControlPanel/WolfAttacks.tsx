import axios, { AxiosError, AxiosResponse } from "axios";
import React, { MouseEvent, useState } from "react";
import { AttackType } from "../../Types/GameTypes";
import { getErrorMessage } from "../../Utils/functions";
import Button from "../Common/Button";

declare function route(name: string): string;
interface PropType {
    attack: AttackType | null;
    roundUnderway: boolean;
}
export default function WolfAttacks({ attack, roundUnderway }: PropType) {
    const attackUnderway = (attack && !attack.resolved) || false;
    const [errMessage, setErrMessage] = useState<string | null>(null);

    const doWolfAttack = (e: MouseEvent<HTMLButtonElement>): void => {
        const attacking = e.currentTarget.id === "start-wolf-attack";
        axios
            .post(route("wolf-attack"), { attacking })
            .then((res: AxiosResponse) => {
                setErrMessage(null);
            })
            .catch((e: AxiosError) => {
                setErrMessage(getErrorMessage(e));
                setTimeout(() => {
                    setErrMessage(null);
                }, 5000);
            });
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
                <div className="flex flex-col items-center justify-center">
                    <div>{statusMessage}</div>
                    <div className="text-center text-red-500 animate-pulse">
                        {errMessage ?? ""}
                    </div>
                </div>
            </div>
        </div>
    );
}
