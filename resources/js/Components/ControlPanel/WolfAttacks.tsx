import axios, { AxiosError } from "axios";
import { DateTime } from "luxon";
import React, { MouseEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../Types/ReduxTypes";
import { getErrorMessage } from "../../Utils/functions";
import Button from "../Common/Button";

declare function route(name: string): string;
export default function WolfAttacks() {
    const { round, attack } = useSelector((state: StoreType) => state);
    const calcRoundUnderway = () => {
        const endsAt = round.team_time_ends_at;
        return endsAt !== null && DateTime.now() < endsAt;
    };
    const [roundUnderway, setRoundUnderway] = useState<boolean>(
        calcRoundUnderway()
    );

    const [errMessage, setErrMessage] = useState<string | null>(null);

    const doWolfAttack = (e: MouseEvent<HTMLButtonElement>): void => {
        const attacking = e.currentTarget.id === "start-wolf-attack";
        axios
            .post(route("wolf-attack"), { attacking })
            .then(() => {
                setErrMessage(null);
            })
            .catch((e: AxiosError) => {
                setErrMessage(getErrorMessage(e));
                setTimeout(() => {
                    setErrMessage(null);
                }, 5000);
            });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setRoundUnderway(calcRoundUnderway());
        }, 250);
        return () => {
            clearInterval(interval);
        };
    }, []);

    let statusMessage: string;
    if (!roundUnderway) {
        statusMessage = "Between Rounds";
    } else {
        statusMessage = attack.attacking ? "Attack Underway" : "No Attack";
    }
    return (
        <div className="grid grid-cols-2 p-2 border-2 border-black rounded-b-lg">
            <div className="col-span-2">Wolf Attacks</div>
            <div className="flex flex-col">
                <Button
                    type="button"
                    className="my-1"
                    disabled={!roundUnderway || attack.attacking}
                    onClick={doWolfAttack}
                    id="start-wolf-attack"
                >
                    Start Wolf Attack
                </Button>
                <Button
                    type="button"
                    className="my-1"
                    disabled={!roundUnderway || !attack.attacking}
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
