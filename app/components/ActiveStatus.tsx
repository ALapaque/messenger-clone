'use client';


import useActiveChannel from "@messenger-clone/app/hooks/useActiveChannel";

export default function ActiveStatus() {
	useActiveChannel();

	return null;
}