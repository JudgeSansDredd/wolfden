import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React, { MouseEvent } from "react";
import Button from "../Common/Button";

declare function route(name: string): string;

export default function Admin() {
    const logout = (e: MouseEvent<HTMLButtonElement>) => {
        Inertia.post(route("logout"));
    };

    return (
        <div className="flex justify-around">
            <Link href={route("get-start-new-game")}>
                <Button
                    type="button"
                    className="mt-4 bg-red-600"
                    disabled={false}
                    id="start-new-game"
                >
                    New Game
                </Button>
            </Link>
            <Button
                type="button"
                className="mt-4"
                disabled={false}
                onClick={logout}
                id="logout"
            >
                Logout
            </Button>
        </div>
    );
}
