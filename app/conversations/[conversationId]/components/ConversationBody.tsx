'use client';

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { find } from "lodash";
import {FullMessageType} from "@messenger-clone/app/types";
import useConversation from "@messenger-clone/app/hooks/useConversation";
import {pusherClient} from "@messenger-clone/app/libs/pusher";
import ConversationMessageItem
	from "@messenger-clone/app/conversations/[conversationId]/components/ConversationMesageItem";

interface ConversationBodyProps {
	initialMessages: FullMessageType[];
}

export default function ConversationBody ({ initialMessages = [] }: ConversationBodyProps) {
	const bottomRef = useRef<HTMLDivElement>(null);
	const [messages, setMessages] = useState(initialMessages);
	const { conversationId } = useConversation();

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	useEffect(() => {
		pusherClient.subscribe(conversationId)
		bottomRef?.current?.scrollIntoView();

		const messageHandler = (message: FullMessageType) => {
			axios.post(`/api/conversations/${conversationId}/seen`);

			setMessages((current) => {
				if (find(current, { id: message.id })) {
					return current;
				}

				return [...current, message]
			});

			bottomRef?.current?.scrollIntoView();
		};

		const updateMessageHandler = (newMessage: FullMessageType) => {
			setMessages((current) => current.map((currentMessage) => {
				if (currentMessage.id === newMessage.id) {
					return newMessage;
				}

				return currentMessage;
			}))
		};


		pusherClient.bind('messages:new', messageHandler)
		pusherClient.bind('message:update', updateMessageHandler);

		return () => {
			pusherClient.unsubscribe(conversationId)
			pusherClient.unbind('messages:new', messageHandler)
			pusherClient.unbind('message:update', updateMessageHandler)
		}
	}, [conversationId]);

	return (
		<div className="flex-1 overflow-y-auto">
			{messages.map((message, i) => (
				<ConversationMessageItem
					isLast={i === messages.length - 1}
					key={message.id}
					message={message}
				/>
			))}
			<div className="pt-24" ref={bottomRef} />
		</div>
	);
}
