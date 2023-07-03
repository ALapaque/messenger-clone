import Sidebar from "@messenger-clone/app/components/sidebar";
import ConversationList from "@messenger-clone/app/conversations/components/ConversationList";
import getConversations from "@messenger-clone/app/actions/getConversations";
import getUsers from "@messenger-clone/app/actions/getUsers";

interface Props {
	children: React.ReactNode
}

export default async function ConversationsLayout({children}: Props) {
	const conversations = await getConversations()
	const users = await getUsers();

	return (
		<Sidebar>
			<div className="h-full">
				<ConversationList
					initialItems={conversations}
					users={users}
				/>
				{children}
			</div>
		</Sidebar>
	)
}