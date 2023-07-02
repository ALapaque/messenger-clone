import prisma from "@messenger-clone/app/libs/prismadb";
import getCurrentUser from "@messenger-clone/app/actions/getCurrentUser";

export default async function getConversations() {
	const currentUser = await getCurrentUser()

	if (!currentUser?.id) {
		return []
	}

	try {
		const conversations = await prisma.conversation.findMany({
			orderBy: {
				lastMessageAt: "desc"
			},
			where: {
				userIds: {
					has: currentUser.id
				}
			},
			include: {
				users: true,
				messages: {
					include: {
						sender: true,
						seen: true
					}
				}
			}
		})

		return conversations
	} catch (e) {
		return []
	}
}