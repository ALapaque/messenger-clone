"use client";

import {useEffect, useRef, useState} from "react";
import useConversation from "@messenger-clone/app/hooks/useConversation";
import ConversationMessageItem
	from "@messenger-clone/app/conversations/[conversationId]/components/ConversationMesageItem";
import {FullMessageType} from "@messenger-clone/app/types";
import axios from "axios";

interface ConversationBodyProps {
	initialMessages: FullMessageType[];
}

export default async function ConversationBody({initialMessages}: ConversationBodyProps) {
	const [messages, setMessages] = useState<FullMessageType[]>(initialMessages)
	const bottomRef = useRef<HTMLDivElement>(null)
	const {conversationId} = useConversation()

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`, {
			conversationId
		})
	}, [conversationId])

	return (
		<div className={'flex-1 overflow-y-auto'}>
			{messages.map((message, index) => (
				<ConversationMessageItem
					key={message.id}
					isLast={index === messages.length - 1}
					message={message}
				/>
			))}

			<div ref={bottomRef} className={'pt-24'}/>
		</div>
	)
}