import {FullConversationType} from "@messenger-clone/app/types";
import clsx from "clsx";
import Avatar from "@messenger-clone/app/components/Avatar";
import {format} from "util";
import {useCallback, useMemo} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import useOtherUser from "@messenger-clone/app/hooks/useOtherUser";

interface ConversationListItemProps {
	conversation: FullConversationType,
	selected: boolean,
}

export default function ConversationListItem({conversation,selected}: ConversationListItemProps) {
	const otherUser = useOtherUser(conversation);
	const session = useSession();
	const router = useRouter();

	const handleClick = useCallback(() => {
		router.push(`/conversations/${conversation.id}`);
	}, [conversation, router]);

	const lastMessage = useMemo(() => {
		const messages = conversation.messages || [];

		return messages[messages.length - 1];
	}, [conversation.messages]);

	const userEmail = useMemo(() => session.data?.user?.email,
		[session.data?.user?.email]);

	const hasSeen = useMemo(() => {
		if (!lastMessage) {
			return false;
		}

		const seenArray = lastMessage.seen || [];

		if (!userEmail) {
			return false;
		}

		return seenArray.filter((user) => user.email === userEmail).length !== 0;
	}, [userEmail, lastMessage]);

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) {
			return 'Sent an image';
		}

		if (lastMessage?.body) {
			return lastMessage?.body
		}

		return 'Started a conversation';
	}, [lastMessage]);

	return (
		<div
			onClick={handleClick}
			className={clsx(`
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        `,
				selected ? 'bg-neutral-100' : 'bg-white'
			)}
		>
			{conversation.isGroup ? (
				<></>
			) : (
				<Avatar user={otherUser} />
			)}
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<span className="absolute inset-0" aria-hidden="true" />
					<div className="flex justify-between items-center mb-1">
						<p className="text-md font-medium text-gray-900">
							{conversation.name || otherUser?.name || 'Unnamed'}
						</p>
						{lastMessage?.createdAt && (
							<p
								className="
                  text-xs
                  text-gray-400
                  font-light
                "
							>
								{format(new Date(lastMessage.createdAt), 'p')}
							</p>
						)}
					</div>
					<p
						className={clsx(`
              truncate 
              text-sm
              `,
							hasSeen ? 'text-gray-500' : 'text-black font-medium'
						)}>
						{lastMessageText}
					</p>
				</div>
			</div>
		</div>
	);
}