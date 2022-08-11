import { Inertia } from "@inertiajs/inertia";
import React, { MouseEvent } from "react";
import Button from "./Button";

declare function route(name: string): string;

export default function Logout() {
    const logout = (e: MouseEvent<HTMLButtonElement>) => {
        Inertia.post(route("logout"));
    };

    return (
        <div className="flex justify-end">
            <Button
                type="button"
                className="mt-4"
                processing={false}
                onClick={logout}
                id="logout"
            >
                Logout
            </Button>
        </div>
    );
}
