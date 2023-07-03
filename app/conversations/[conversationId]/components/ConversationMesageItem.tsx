"use client";

import {useSession} from "next-auth/react";
import {FullMessageType} from "@messenger-clone/app/types";
import {useMemo, useState} from "react";
import clsx from "clsx";
import Avatar from "@messenger-clone/app/components/Avatar";
import {format} from "date-fns";
import Image from "next/image";
import ImageModal from "@messenger-clone/app/components/modals/ImageModal";

interface ConversationMessageItemProps {
	message: FullMessageType;
	isLast: boolean
}

export default function ConversationMessageItem({message, isLast}: ConversationMessageItemProps) {
	const session = useSession()
	const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false)
	const isOwn = session?.data?.user?.email === message?.sender?.email

	const seenList = useMemo(() => {
		return (message.seen || [])
			.filter((user) => user.email !== session?.data?.user?.email)
			.map((user) => user.name)
			.join(", ")
	}, [message.seen, session?.data?.user?.email]);

	const containerClassName = clsx(
		"flex gap-3 p-4",
		isOwn && "justify-end",
	)
	const avatarClassName = clsx(isOwn && "order-2")
	const bodyClassName = clsx(
		"flex flex-col gap-2",
		isOwn && "items-end",
	)
	const messageClassName = clsx(
		"text-sm w-fit overflow-hidden",
		isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
		message.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
	)

	return (
		<div className={containerClassName}>
			<div className={avatarClassName}>
				<Avatar user={message.sender}/>
			</div>

			<div className={bodyClassName}>
				<div className={'flex items-center gap-1'}>
					<div className={'text-sm text-gray-500'}>
						{message.sender.name}
					</div>

					<div className={'text-xs text-gray-400'}>
						{format(new Date(message.createdAt), 'p')}
					</div>
				</div>

				<div className={messageClassName}>
					<ImageModal
						src={message.image}
						isOpen={isImageModalOpen}
						onClose={() => setIsImageModalOpen(false)}
					/>
					{message.image
						? (
							<Image
								onClick={() => setIsImageModalOpen(true)}
								src={message.image}
								alt={'chat image'}
								height={288}
								width={288}
								className={'object-cover cursor-pointer hover:scale-110 transition translate'}/>
						) : (
							message.body
						)}
				</div>
				{isLast && isOwn && seenList.length > 0 && (
					<div className={'text-xs font-light text-gray-500 italic'}>
						{`Seen by ${seenList}`}
					</div>
				)}
			</div>
		</div>
	)
}