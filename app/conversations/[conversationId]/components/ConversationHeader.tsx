"use client"

import {Conversation, User} from "@prisma/client";
import useOtherUser from "@messenger-clone/app/hooks/useOtherUser";
import {useMemo, useState} from "react";
import Link from "next/link";
import {HiChevronLeft, HiEllipsisHorizontal} from "react-icons/hi2";
import Avatar from "@messenger-clone/app/components/Avatar";
import ProfileDrawer from "@messenger-clone/app/conversations/[conversationId]/components/ProfileDrawer";
import {useRouter} from "next/navigation";
import useActiveList from "@messenger-clone/app/hooks/useActiveList";

interface ConversationHeaderProps {
	conversation: Conversation & { users: User[] }
}

export default function ConversationHeader({conversation}: ConversationHeaderProps) {
	const router = useRouter()
	const otherUser = useOtherUser(conversation);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const { members } = useActiveList();
	const isActive = members.indexOf(otherUser?.email!) !== -1;
	const statusText = useMemo(() => {
		if (conversation.isGroup) {
			return `${conversation.users.length} members`;
		}

		return isActive ? 'Active' : 'Offline'
	}, [conversation, isActive]);

	return (
		<>
			<ProfileDrawer
				conversation={conversation}
				onClose={() => setDrawerOpen(false)}
				isOpen={drawerOpen}/>

			<div
				className={'bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'}>
				<div className={'flex gap-3 items-center'}>
					<Link
						href={'/conversations'}
						onClick={() => router.back()}
						className={'lg:hidden block text-gray-500 cursor-pointer hover:text-gray-600 transition'}>
						<HiChevronLeft size={24}/>
					</Link>

					<Avatar user={otherUser}/>

					<div className={'flex flex-col'}>
						<div>{conversation.name || otherUser.name}</div>
						<div className={'text-sm font-light text-neutral-500'}>
							{statusText}
						</div>
					</div>
				</div>

				<button
					onClick={() => setDrawerOpen(true)}
					className={'text-gray-500 cursor-pointer hover:text-gray-600 transition'}>
					<HiEllipsisHorizontal size={32}/>
				</button>
			</div>
		</>
	)
}