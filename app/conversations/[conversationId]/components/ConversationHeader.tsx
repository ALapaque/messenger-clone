"use client"

import {Conversation, User} from "@prisma/client";
import useOtherUser from "@messenger-clone/app/hooks/useOtherUser";
import {useMemo} from "react";
import Link from "next/link";
import {HiChevronLeft, HiEllipsisHorizontal} from "react-icons/hi2";
import Avatar from "@messenger-clone/app/components/Avatar";

interface ConversationHeaderProps {
	conversation: Conversation & { users: User[] }
}

export default function ConversationHeader({conversation}: ConversationHeaderProps) {
	const otherUser = useOtherUser(conversation)

	const statusText = useMemo(() => {
		if (conversation.isGroup) {
			return `${conversation.users.length} members`
		}

		return 'Active'
	}, []);

	return (
		<div
			className={'bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'}>
			<div className={'flex gap-3 items-center'}>
				<Link
					href={'/conversations'}
					className={'lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'}>
					<HiChevronLeft size={32}/>
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
				onClick={() => {}}
				className={'text-gray-500 cursor-pointer hover:text-gray-600 transition'}>
				<HiEllipsisHorizontal size={32}/>
			</button>
		</div>
	)
}