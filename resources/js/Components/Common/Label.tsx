import React from "react";

interface PropType {
    forInput: string;
    value: string;
    className: string;
}

export default function Label({
    forInput,
    value,
    className,
    children,
}: React.PropsWithChildren<PropType>) {
    return (
        <label
            htmlFor={forInput}
            className={`block font-medium text-sm text-gray-700 ` + className}
        >
            {value ? value : children}
        </label>
    );
}
