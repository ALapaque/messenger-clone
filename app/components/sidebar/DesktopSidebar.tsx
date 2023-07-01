"use client";

import useRoutes from "@messenger-clone/app/hooks/useRoutes";
import {useState} from "react";
import DesktopItem from "@messenger-clone/app/components/sidebar/DesktopItem";

export default function DesktopSidebar() {
	const routes = useRoutes()
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div className={'hidden justify-between ' +
			'lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-clo ' +
			'xl:px-6 '}>
			<nav className={'w-full mt-4 flex flex-col justify-between'}>
				<ul
					className={'flex flex-col items-center space-y-1'}
					role={'list'}>
					{routes.map((route) => (
						<DesktopItem key={route.label} {...route} />
					))}
				</ul>
			</nav>
		</div>
	)
}