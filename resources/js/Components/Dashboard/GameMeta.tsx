import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../Types/ReduxTypes";

declare function route(name: string): string;

export default function GameMeta() {
    const { game } = useSelector((state: StoreType) => {
        return state;
    });

    const uri = game.room_code
        ? `${route("dashboard")}?room_code=${game.room_code}`
        : null;

    return (
        <div>
            {uri ? (
                <Link href={uri} target="_blank">
                    {uri}
                </Link>
            ) : (
                "No link yet available"
            )}
        </div>
    );
}
