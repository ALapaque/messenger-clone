import NextAuth from "next-auth"
import {authOptions} from "@messenger-clone/app/api/auth/[...nextauth]/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };