import axios, { AxiosError, AxiosResponse } from "axios";
import { DateTime } from "luxon";
import React, { MouseEvent, useState } from "react";
import { RoundType } from "../Types/GameTypes";
import { getErrorMessage, getTimerString } from "../Utils/functions";
import Button from "./ControlPanel/Button";

declare function route(name: string): string;

interface PropType {
    round: RoundType | null;
}

interface StateType {
    errMessage: string | null;
    statusMessage: string;
    roundComplete: boolean;
}

export default function RoundController({ round }: PropType) {
    const dtActionTimeEndsAt = round
        ? DateTime.fromISO(round.action_time_ends_at)
        : null;
    const dtTeamTimeEndsAt = round
        ? DateTime.fromISO(round.team_time_ends_at)
        : null;

    const [roundState, setRoundState] = useState<StateType>({
        errMessage: null,
        statusMessage: "",
        roundComplete: false,
    });

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
        let statusMessage: string;
        let roundComplete: boolean;
        if (dtActionTimeEndsAt === null || dtTeamTimeEndsAt === null) {
            statusMessage = "Round has not started.";
            roundComplete = true;
        } else if (DateTime.now() < dtActionTimeEndsAt) {
            const remaining = getTimerString(dtActionTimeEndsAt);
            statusMessage = `Action Time Remaining: ${remaining}`;
            roundComplete = false;
        } else if (DateTime.now() < dtTeamTimeEndsAt) {
            const remaining = getTimerString(dtTeamTimeEndsAt);
            statusMessage = `Team Time Remaining: ${remaining}`;
            roundComplete = false;
        } else {
            statusMessage = "Round is over. Start the next round.";
            roundComplete = true;
        }
        setRoundState((prev) => {
            return { ...prev, statusMessage, roundComplete };
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
                <div
                    className={`flex items-center justify-center text-center ${
                        roundState.roundComplete
                            ? "animate-pulse text-red-600"
                            : ""
                    }`}
                >
                    {roundState.statusMessage}
                </div>
                <div className="text-center text-red-500 animate-pulse">
                    {roundState.errMessage ?? ""}
                </div>
            </div>
        </div>
    );
}
