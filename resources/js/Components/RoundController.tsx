import axios, { AxiosError, AxiosResponse } from "axios";
import { DateTime } from "luxon";
import React, { MouseEvent, useState } from "react";
import { RoundType } from "../Types/GameTypes";
import { getErrorMessage, getTimerString } from "../Utils/functions";
import Button from "./Button";

declare function route(name: string): string;

interface PropType {
    round: RoundType | null;
}

export default function RoundController({ round }: PropType) {
    const dtActionTimeEndsAt = round
        ? DateTime.fromISO(round.action_time_ends_at)
        : null;
    const dtTeamTimeEndsAt = round
        ? DateTime.fromISO(round.team_time_ends_at)
        : null;

    const getStatusMessage = (): string => {
        if (dtActionTimeEndsAt === null || dtTeamTimeEndsAt === null) {
            return "Round has not started.";
        } else if (DateTime.now() < dtActionTimeEndsAt) {
            const remaining = getTimerString(dtActionTimeEndsAt);
            return `Action Time Remaining: ${remaining}`;
        } else {
            const remaining = getTimerString(dtTeamTimeEndsAt);
            return `Team Time Remaining: ${remaining}`;
        }
    };

    const [roundState, setRoundState] = useState<{
        errMessage: string | null;
        statusMessage: string;
    }>({ errMessage: null, statusMessage: getStatusMessage() });

    const startRound = (e: MouseEvent<HTMLButtonElement>): void => {
        const id = e.currentTarget.id;
        if (id === "start-new-round") {
            axios
                .post(route("post-start-new-round"), {})
                .then((res: AxiosResponse) => {
                    setRoundState((prev) => {
                        return { ...prev, errMessage: null };
                    });
                })
                .catch((e: AxiosError) => {
                    setRoundState((prev) => {
                        return { ...prev, errMessage: getErrorMessage(e) };
                    });
                });
        }
    };

    setInterval(() => {
        const statusMessage = getStatusMessage();
        setRoundState((prev) => {
            return { ...prev, statusMessage };
        });
    }, 250);

    return (
        <div className="grid grid-cols-2 p-2 border-2 border-black rounded-t-lg">
            <div className="col-span-2">Round Control</div>
            <div className="flex flex-col">
                <Button
                    type="button"
                    className="my-1"
                    disabled={false}
                    onClick={startRound}
                    id="start-new-round"
                >
                    Start New Round
                </Button>
            </div>
            <div className="flex flex-col justify-center items center">
                <div className="flex items-center justify-center text-center">
                    {roundState.statusMessage}
                </div>
                <div className="text-center text-red-500 animate-pulse">
                    {roundState.errMessage ?? ""}
                </div>
            </div>
        </div>
    );
}
