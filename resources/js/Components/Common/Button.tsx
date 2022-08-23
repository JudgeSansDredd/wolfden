import React, { MouseEvent } from "react";

interface PropType {
    type?: "submit" | "button" | "reset";
    className: string;
    colorClasses?: string;
    disabled: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    id?: string;
}

export default function Button(props: React.PropsWithChildren<PropType>) {
    return (
        <button
            id={props.id}
            type={props.type}
            className={
                `inline-flex items-center px-4 py-2 ${
                    props.colorClasses ?? ""
                } border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest transition ease-in-out duration-150 ${
                    props.disabled && "opacity-25"
                } ` + props.className
            }
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
