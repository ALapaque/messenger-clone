"use client";

import useConversation from "@messenger-clone/app/hooks/useConversation";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {HiPaperAirplane, HiPhoto} from "react-icons/hi2";
import ConversationMessageInput
	from "@messenger-clone/app/conversations/[conversationId]/components/ConversationMessageInput";
import {CldUploadButton} from "next-cloudinary";

export default function ConversationForm() {
	const {conversationId} = useConversation()

	const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<FieldValues>({
		defaultValues: {
			message: ''
		}
	})

	const _handleSubmit: SubmitHandler<FieldValues> = (data) => {
		reset()
		axios.post(`/api/messages`, {
			...data,
			conversationId
		})
	}

	const _handleUpload = (result: any) => {
		axios.post('/api/messages', {
			image: result?.info?.secure_url,
			conversationId
		})
	}

	return (
		<div className={'py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'}>
			<CldUploadButton
				options={{maxFiles: 1}}
				onUpload={_handleUpload}
				uploadPreset={'usvb8qme'}
			>
				<HiPhoto
					className={'text-sky-500 cursor-pointer hover:text-sky-600 transition'}
					size={30}/>
			</CldUploadButton>

			<form
				onSubmit={handleSubmit(_handleSubmit)}
				className={'flex items-center gap-2 lg:gap-4 w-full'}>
				<ConversationMessageInput
					id={'message'}
					register={register}
					errors={errors}
					required
					placeholder={'Write a message'}/>

				<button
					type={'submit'}
					className={'rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition text-white'}>
					<HiPaperAirplane size={18}/>
				</button>
			</form>
		</div>
	)
}