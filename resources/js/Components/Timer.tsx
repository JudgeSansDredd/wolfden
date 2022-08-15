import { DateTime } from "luxon";
import React, { useState } from "react";
import { getTimerString } from "../Utils/functions";

interface PropType {
    target: DateTime;
    styleClass?: string;
}

export default function Timer({ target, styleClass }: PropType) {
    const [timeRemaining, setTimeRemaining] = useState<string>(
        getTimerString(target)
    );

    setInterval(() => {
        setTimeRemaining(getTimerString(target));
    }, 250);

    return <div className={styleClass ?? ""}>{timeRemaining}</div>;
}
