import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../Types/ReduxTypes";
import { getTimerString } from "../../Utils/functions";

export default function ActionTimer() {
    const round = useSelector((state: StoreType) => state.round);

    const [timerState, setTimerState] = useState<{
        timerString: string;
    }>({
        timerString: getTimerString(round.action_time_ends_at),
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const timerString = getTimerString(round.action_time_ends_at);
            setTimerState({ timerString });
        }, 250);
        return () => clearInterval(interval);
    }, [round]);

    return (
        <div className="flex my-2 text-xl border-2 border-yellow-500 border-solid rounded-full">
            <div className="p-2 text-center text-white bg-yellow-500 rounded-l-full">
                Action Phase
            </div>
            <div className="flex-grow p-2 text-center">
                {timerState.timerString}
            </div>
        </div>
    );
}
