import Sidebar from "@messenger-clone/app/components/sidebar";
import ConversationList from "@messenger-clone/app/conversations/components/ConversationList";
import getConversations from "@messenger-clone/app/actions/getConversations";

interface Props {
	children: React.ReactNode
}

export default async function ConversationsLayout({children}: Props) {
	const conversations = await getConversations()

	return (
		<Sidebar>
			<div className="h-full">
				<ConversationList initialItems={conversations}/>
				{children}
			</div>
		</Sidebar>
	)
}