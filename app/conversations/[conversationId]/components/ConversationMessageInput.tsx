import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";

interface ConversationMessageInputProps {
	id: string;
	placeholder?: string;
	type?: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

export default function ConversationMessageInput({
																									 register,
																									 errors,
																									 ...inputProps
																								 }: ConversationMessageInputProps) {
	return (
		<div className={'relative w-full'}>
			<input
				autoComplete={inputProps.id}
				{...inputProps}
				{...register(inputProps.id, {required: inputProps.required})}
				className={'text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none'}
			/>
		</div>
	)
}