"use client";

import Link from "next/link";
import clsx from "clsx";

interface DesktopItemProps {
	label: string;
	icon: any;
	href: string;
	onClick?(): void,
	active?: boolean
}

export default function DesktopItem({label, active, href, icon: Icon, onClick}: DesktopItemProps) {
	const _handleClick = () => {
		onClick && onClick()
	}

	return (
		<li onClick={_handleClick}>
			<Link href={href}
			className={clsx(`
				group
				flex
				gap-x-3
				rounded-md
				p-3
				text-sm
				leading-6
				font-semibold
				text-gray-500
				hover:text-black
				hover:bg-gray-100
			`,
				active && 'bg-gray-100 text-black'
				)}>
				<Icon className={'h-6 w-6 shrink-0'}/>
				<span className={'sr-only'}>{label}</span>
			</Link>
		</li>
	)
}