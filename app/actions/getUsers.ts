import getSession from "@messenger-clone/app/actions/getSession";
import prisma from "@messenger-clone/app/libs/prismadb";

export default async function getUsers() {
	const session = await getSession()

	if (!session?.user?.email) {
		return []
	}

	try {
		return await prisma.user.findMany({
			orderBy: {
				createdAt: "desc"
			},
			where: {
				NOT: {
					email: session.user.email
				}
			}
		})
	} catch (e: any) {
		return []
	}
}