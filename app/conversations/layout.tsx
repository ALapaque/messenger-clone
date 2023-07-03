import Sidebar from "@messenger-clone/app/components/sidebar";
import ConversationList from "@messenger-clone/app/conversations/components/ConversationList";
import getConversations from "@messenger-clone/app/actions/getConversations";
import getUsers from "@messenger-clone/app/actions/getUsers";
import getCurrentUser from "@messenger-clone/app/actions/getCurrentUser";

interface Props {
	children: React.ReactNode
}

export default async function ConversationsLayout({children}: Props) {
	const conversations = await getConversations()
	const users = await getUsers();
	const currentUser = await getCurrentUser();

	return (
		<Sidebar>
			<div className="h-full">
				<ConversationList
					initialItems={conversations}
					users={users}
					currentUser={currentUser}
				/>
				{children}
			</div>
		</Sidebar>
	)
}