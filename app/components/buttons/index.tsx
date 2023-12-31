import {ReactNode} from "react";
import clsx from "clsx";

interface ButtonProps {
    children?: ReactNode,
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
    onClick?(): void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

export default function Button({children, fullWidth, secondary, danger, ...otherProps}: ButtonProps){
    return (
        <button
            className={clsx(`
            flex
            justify-center
            rounded-md
            px-3
            py-2
            text-sm
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            `,
            otherProps.disabled && 'opacity-50 cursor-default',
            fullWidth && 'w-full',
            secondary ? 'text-gray-900' : 'text-white',
            danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
            !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
            )}
            {...otherProps}>
            {children}
        </button>
    )
}