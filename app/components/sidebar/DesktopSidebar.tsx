"use client";

import useRoutes from "@messenger-clone/app/hooks/useRoutes";
import {useState} from "react";
import DesktopItem from "@messenger-clone/app/components/sidebar/DesktopItem";
import {User} from "@prisma/client";
import Avatar from "@messenger-clone/app/components/Avatar";
import LogoutItem from "@messenger-clone/app/components/sidebar/LogoutItem";
import SettingsModal from "@messenger-clone/app/components/modals/SettingsModal";

interface DesktopSidebarProps {
	currentUser: User
}

export default function DesktopSidebar({currentUser}: DesktopSidebarProps) {
	const routes = useRoutes()
	const navItems = routes.filter((route) => route.label !== 'Logout')
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<>
			<SettingsModal
				currentUser={currentUser}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}/>
			<div className={'hidden justify-between ' +
				'lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col ' +
				'xl:px-6 '}>
				<nav className={'w-full mt-4 flex flex-col justify-between'}>
					<ul
						className={'flex flex-col items-center space-y-1'}
						role={'list'}>
						{navItems.map((route) => (
							<DesktopItem key={route.label} {...route} />
						))}
					</ul>
				</nav>

				<nav className={'mt-4 flex flex-col justify-between items-center'}>
					<ul
						className={'flex flex-col items-center space-y-3'}
						role={'list'}>
						<LogoutItem/>

						<li
							onClick={() => setIsOpen(true)}
							className={'cursor-pointer hover:opacity-75 transition'}>
							<Avatar user={currentUser}/>
						</li>
					</ul>
				</nav>
			</div>
		</>
	)
}