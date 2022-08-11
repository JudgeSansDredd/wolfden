import { Link } from "@inertiajs/inertia-react";
import React, { ChangeEvent, useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Label from "../Components/Label";
import Guest from "../Layouts/Guest";

declare function route(name: string): string;

export default function NewGame() {
    const [confirmation, setConfirmation] = useState<string>("");

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmation(e.currentTarget.value);
    };

    return (
        <Guest>
            <div className="text-3xl">Start a new game?</div>
            <Label
                className=""
                children=""
                forInput="confirmation"
                value="Confirm New Game"
            />
            <Input
                required={true}
                type="text"
                isFocused={true}
                name="confirmation"
                value={confirmation}
                className="block w-full mt-1"
                autoComplete="off"
                handleChange={onHandleChange}
                placeholder="start-new-game"
            />
            <div className="flex justify-between">
                <Link href={route("control-panel")}>
                    <Button
                        className="mt-2 bg-red-600 active:bg-red-900"
                        processing={false}
                    >
                        Return to Control Panel
                    </Button>
                </Link>
                <Button
                    className="mt-2 bg-green-600 active:bg-green-900"
                    processing={false}
                >
                    Start New Game
                </Button>
            </div>
        </Guest>
    );
}
