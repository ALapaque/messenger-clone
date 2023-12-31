"use client";

import useConversation from "@messenger-clone/app/hooks/useConversation";
import EmptyState from "@messenger-clone/app/components/EmptyState";
import clsx from "clsx";

export default function Conversations() {
	const {isOpen} = useConversation();

	return (
		<div className={clsx(
			'lg:pl-80 h-full lg:block',
			isOpen ? 'block' : 'hidden'
		)}>
			<EmptyState />
		</div>
	)
}