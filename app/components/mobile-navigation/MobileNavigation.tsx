"use client";

import useRoutes from "@messenger-clone/app/hooks/useRoutes";
import useConversation from "@messenger-clone/app/hooks/useConversation";
import MobileItem from "@messenger-clone/app/components/mobile-navigation/MobileItem";

export default function MobileNavigation() {
	const routes = useRoutes()
	const {isOpen} = useConversation()

	if (isOpen) {
		return null
	}

	return (
		<div
			className={'fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'}>
			{routes.map((route) => (
				<MobileItem key={route.label} {...route} />
			))}
		</div>
	)
}