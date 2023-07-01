"use client";

import Button from "@messenger-clone/app/components/buttons";
import {signOut} from "next-auth/react";

export default function Users() {
	return (
		<Button onClick={() => signOut()}>LOG OUT</Button>
	)
}