import {IconType} from "react-icons";
import clsx from "clsx";

interface AuthSocialButtonsProps {
    icon: IconType;
    onClick(): void;
    disabled?: boolean;
}

export default function AuthSocialButton({icon: Icon, disabled, onClick}: AuthSocialButtonsProps) {
    return (
        <button
            type={'button'}
            onClick={onClick}
            disabled={disabled}
            className={clsx(`
            inline-flex
            w-full
            justify-center
            rounded-md
            bg-white
            px-4
            py-2
            text-gray-500
            shadow-sm
            ring-1 ring-inset ring-gray-300
            hover:bg-gray-50
            focus:outline-offset
            `,
            disabled && "text-gray-200 opacity-50 cursor-default")}>
            <Icon />
        </button>
    )
}