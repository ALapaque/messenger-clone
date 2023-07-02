import getConversationById from "@messenger-clone/app/actions/getConversationById";
import EmptyState from "@messenger-clone/app/components/EmptyState";
import ConversationHeader from "@messenger-clone/app/conversations/[conversationId]/components/ConversationHeader";
import ConversationBody from "@messenger-clone/app/conversations/[conversationId]/components/ConversationBody";
import ConversationForm from "@messenger-clone/app/conversations/[conversationId]/components/ConversationForm";
import getMessages from "@messenger-clone/app/actions/getMessages";

interface ConversationProps {
	conversationId: string;
}

export default async function Conversation({params: {conversationId}}: { params: ConversationProps }) {
	const conversation = await getConversationById(conversationId)
	const messages = await getMessages(conversationId)

	if (!conversation) {
		return (
			<div className={'lg:pl-80 h-full'}>
				<div className={'h-full flex flex-col'}>
					<EmptyState />
				</div>
			</div>
		)
	}

	return (
		<div className={'lg:pl-80 h-full'}>
			<div className={'h-full flex flex-col'}>
				<ConversationHeader conversation={conversation} />

				<ConversationBody initialMessages={messages} />

				<ConversationForm />
			</div>
		</div>
	)
}