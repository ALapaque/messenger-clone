import {useParams} from "next/navigation";
import {useMemo} from "react";

export default function useConversation() {
	const params = useParams();

	const conversationId = useMemo(() => {
		return params?.conversationId || ''
	}, [params]);

	const isOpen = useMemo(() => !!conversationId, [conversationId]);

	return useMemo(() => ({
		isOpen,
		conversationId
	}), [conversationId, isOpen]);
}
