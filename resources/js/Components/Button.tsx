import React, { MouseEvent } from "react";

interface PropType {
    type?: "submit" | "button" | "reset";
    className: string;
    processing: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    id?: string;
}

export default function Button({
    type = "submit",
    className = "",
    processing,
    children,
    onClick,
    id,
}: React.PropsWithChildren<PropType>) {
    return (
        <button
            id={id}
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
