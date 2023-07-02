import prisma from "@messenger-clone/app/libs/prismadb";

export default async function getMessages(id: string) {
	try {
		return await prisma.message.findMany({
			orderBy: {
				createdAt: 'asc'
			},
			where: {
				conversationId: id
			},
			include: {
				sender: true,
				seen: true
			}
		})
	} catch (e) {
		return []
	}
}