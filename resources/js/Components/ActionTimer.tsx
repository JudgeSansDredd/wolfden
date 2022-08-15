import { DateTime } from "luxon";
import React, { useState } from "react";
import { RoundType } from "../Types/GameTypes";
import { getTimerString } from "../Utils/functions";

interface PropType {
    round: RoundType;
}

export default function ActionTimer({ round }: PropType) {
    const dtActionTimeEndsAt = DateTime.fromISO(round.action_time_ends_at);
    const getVisible = () => {
        return true;
        // return DateTime.now() < dtActionTimeEndsAt;
    };

    const [timerState, setTimerState] = useState<{
        timerString: string;
        visible: boolean;
    }>({
        timerString: getTimerString(dtActionTimeEndsAt),
        visible: getVisible(),
    });

    setInterval(() => {
        const timerString = getTimerString(dtActionTimeEndsAt);
        const visible = getVisible();
        setTimerState({ timerString, visible });
    }, 250);

    return (
        <div
            className={`flex my-2 text-xl border-2 border-yellow-500 border-solid rounded-full ${
                timerState.visible ? "" : "hidden"
            }`}
        >
            <div className="p-2 text-center text-white bg-yellow-500 rounded-l-full">
                Action Phase
            </div>
            <div className="flex-grow p-2 text-center">
                {timerState.timerString}
            </div>
        </div>
    );
}
