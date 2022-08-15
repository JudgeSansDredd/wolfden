import axios, { AxiosError, AxiosResponse } from "axios";
import React, { MouseEvent, useState } from "react";
import { RoundType } from "../Types/GameTypes";
import { getErrorMessage } from "../Utils/functions";
import Button from "./Button";

declare function route(name: string): string;

interface PropType {
    round: RoundType | null;
}

export default function RoundController({ round }: PropType) {
    const statusMessage = "A round or something?";
    const [errMessage, setErrMessage] = useState<string | null>(null);

    const startRound = (e: MouseEvent<HTMLButtonElement>): void => {
        const id = e.currentTarget.id;
        if (id === "start-new-round") {
            axios
                .post(route("post-start-new-round"), {})
                .then((res: AxiosResponse) => {
                    setErrMessage(null);
                })
                .catch((e: AxiosError) => {
                    setErrMessage(getErrorMessage(e));
                });
        }
    };

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
                    {statusMessage}
                </div>
                <div className="text-center text-red-500 animate-pulse">
                    {errMessage ?? ""}
                </div>
            </div>
        </div>
    );
}
