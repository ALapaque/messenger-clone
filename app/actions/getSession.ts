import {getServerSession} from "next-auth";
import {authOptions} from "@messenger-clone/app/api/auth/[...nextauth]/route";

export default async function getSession() {
	return await getServerSession(authOptions)
}