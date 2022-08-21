import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../Types/ReduxTypes";
import { getTimerString } from "../../Utils/functions";

export default function TeamTimer() {
    const round = useSelector((state: StoreType) => state.round);
    const getVisible = () => {
        if (!round.action_time_ends_at) {
            return false;
        }
        return DateTime.now() >= round.action_time_ends_at;
    };

    const [timerState, setTimerState] = useState<{
        timerString: string;
        visible: boolean;
    }>({
        timerString: getTimerString(round.team_time_ends_at),
        visible: getVisible(),
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const timerString = getTimerString(round.team_time_ends_at);
            const visible = getVisible();
            setTimerState({ timerString, visible });
        }, 250);

        return () => clearInterval(interval);
    }, [round]);

    return (
        <div
            className={`flex my-2 text-xl border-2 border-green-600 border-solid rounded-full ${
                timerState.visible ? "" : "hidden"
            }`}
        >
            <div className="p-2 text-center text-white bg-green-600 rounded-l-full">
                Team Phase
            </div>
            <div className="flex-grow p-2 text-center">
                {timerState.timerString}
            </div>
        </div>
    );
}
