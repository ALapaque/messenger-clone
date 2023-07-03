"use client"

import {FullConversationType} from "@messenger-clone/app/types";
import {useState} from "react";
import {useRouter} from "next/navigation";
import useConversation from "@messenger-clone/app/hooks/useConversation";
import ConversationListItem from "@messenger-clone/app/conversations/components/ConversationListItem";
import {useSession} from "next-auth/react";
import {MdOutlineGroupAdd} from "react-icons/md";
import clsx from "clsx";
import GroupChatModal from "@messenger-clone/app/components/modals/GroupChatModal";
import {User} from "@prisma/client";

interface ConversationListProps {
	initialItems: FullConversationType[],
	users: User[];
}

export default function ConversationList({initialItems, users}: ConversationListProps) {
	const [conversations, setConversations] = useState(initialItems);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter();
	const session = useSession();
	const {conversationId, isOpen} = useConversation();

	return (
		<>
			<GroupChatModal
				users={users}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
			<aside
				className={clsx(`
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `, isOpen ? 'hidden' : 'block w-full left-0')}>
				<div className={'px-5 w-full'}>
					<div className={'flex w-full justify-between items-center'}>
						<h3 className={'text-2xl font-bold text-neutral-800 py-4'}>Messages</h3>
						<button
							onClick={() => setIsModalOpen(true)}
							className={'h-[40px] w-[40px] rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition'}>
							<MdOutlineGroupAdd size={20} />
						</button>
					</div>

					{conversations.map((conversation) => (
						<ConversationListItem
							key={conversation.id}
							conversation={conversation}
							selected={conversation.id === conversationId}/>
					))}
				</div>
			</aside>
		</>
	);
}