"use client";

import {useRouter} from "next/navigation";
import useConversation from "@messenger-clone/app/hooks/useConversation";
import {useCallback, useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import Modal from "@messenger-clone/app/components/modals/index";
import {FiAlertTriangle} from "react-icons/fi";
import {Dialog} from "@headlessui/react";
import Button from "@messenger-clone/app/components/buttons";

interface ConfirmModalProps {
	isOpen?: boolean;

	onClose(): void;
}

export default function DeleteConversastionModal({isOpen, onClose}: ConfirmModalProps) {
	const router = useRouter()
	const {conversationId} = useConversation()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const _handleDelete = useCallback(() => {
		setIsLoading(true)

		axios.delete(`/api/conversations/${conversationId}`)
			.then(() => {
				onClose()
				router.push('/conversations')
			})
			.catch(() => {
				toast.error('Something went wrong')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [router, conversationId, onClose])

	return (
		<Modal
			onClose={onClose}
			isOpen={isOpen}>
			<div className={'sm:flex sm:items-start'}>
				<div className={'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'}>
					<FiAlertTriangle className={'h-6 w-6 text-red-600'} />
				</div>

				<div className={'mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'}>
					<Dialog.Title
						as={'h3'}
						className={'text-base font-semibold leading-6 text-gray-600'}>
						Delete conversation
					</Dialog.Title>

					<div className={'mt-2'}>
						<p className={'text-sm text-gray-500'}>Are you sure you want to delete this conversation, this action cannot be undone</p>
					</div>
				</div>
			</div>

			<div className={'mt-5 sm:mt-4 flex flex-row-reverse gap-3'}>
				<Button
					disabled={isLoading}
					onClick={_handleDelete}
					danger>
					Delete
				</Button>

				<Button
					disabled={isLoading}
					onClick={onClose}
					secondary>
					Close
				</Button>
			</div>
		</Modal>
	)
}