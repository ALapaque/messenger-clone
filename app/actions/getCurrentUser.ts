import getSession from "@messenger-clone/app/actions/getSession";
import prisma from "@messenger-clone/app/libs/prismadb";

export default async function getCurrentUser() {
	try {
		const session = await getSession()

		if (!session?.user?.email) {
			return null
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email
			}
		})

		if (!currentUser) {
			return null
		}

		return currentUser
	} catch (e: any) {
		return null;
	}
}