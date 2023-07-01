import useConversation from "@messenger-clone/app/hooks/useConversation";
import {usePathname} from "next/navigation";
import {HiChat, HiUsers} from "react-icons/hi";
import {useMemo} from "react";
import {signOut} from "next-auth/react";
import {HiArrowLeftOnRectangle} from "react-icons/hi2";

export default function useRoutes() {
	const pathName = usePathname()
	const {conversationId} = useConversation()

	return useMemo(() => [
		{
			label: 'Chat',
			href: '/conversations',
			icon: HiChat,
			active: pathName === '/conversations' || !!conversationId
		},
		{
			label: 'Users',
			href: '/users',
			icon: HiUsers,
			active: pathName === '/users'
		},
		{
			label: 'Logout',
			href: '#',
			onClick: () => signOut(),
			icon: HiArrowLeftOnRectangle
		}
	], [pathName, conversationId]);
}