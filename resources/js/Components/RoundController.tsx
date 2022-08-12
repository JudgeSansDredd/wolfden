import React from "react";
import Button from "./Button";

export default function RoundController() {
    const statusMessage = "A round or something?";
    return (
        <div className="grid grid-cols-2 p-2 border-2 border-black rounded-t-lg">
            <div className="col-span-2">Round Control</div>
            <div className="flex flex-col">
                <Button
                    type="button"
                    className="my-1"
                    disabled={false}
                    onClick={() => {}}
                    id="start-wolf-attack"
                >
                    Start New Round
                </Button>
                <Button
                    type="button"
                    className="my-1"
                    disabled={false}
                    onClick={() => {}}
                    id="end-wolf-attack"
                >
                    Restart Current Round
                </Button>
            </div>
            <div className="flex items-center justify-center">
                {statusMessage}
            </div>
        </div>
    );
}
