import prisma from "@messenger-clone/app/libs/prismadb"
import getCurrentUser from "@messenger-clone/app/actions/getCurrentUser";

export default async function getConversationById(id: string) {
	try {
		const currentUser = await getCurrentUser()

		if (!currentUser?.email) {
			return null
		}

		return await prisma.conversation.findUnique({
			where: {
				id
			},
			include: {
				users: true
			}
		})
	} catch (e) {
		return null
	}
}