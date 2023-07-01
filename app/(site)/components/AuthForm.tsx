'use client';

import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@messenger-clone/app/components/fields/input/Input";
import Button from "@messenger-clone/app/components/buttons";
import {BsGithub, BsGoogle} from "react-icons/bs";
import AuthSocialButton from "@messenger-clone/app/(site)/components/AuthSocialButton";
import axios from "axios";
import {toast} from "react-hot-toast";
import {signIn} from "next-auth/react";

type Variant = 'LOGIN' | 'REGISTER';

export default function AuthForm() {
	const [variant, setVariant] = useState<Variant>('LOGIN')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const _toggleVariant = useCallback(() => {
		variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN')
	}, [variant])

	const {
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	const _onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
		setIsLoading(true)

		if (variant === 'REGISTER') {
			axios.post('/api/register', data)
				.catch(() => {
					toast.error('Something went wrong')
				})
				.finally(() => {setIsLoading(false)})
		} else {
			signIn('credentials', {
				...data,
				redirect: false
			})
				.then((callback) => {
					if (callback?.error) {
						toast.error('Invalid credentials')
					} else if (callback?.ok) {
						toast.success('Welcome!')
					}
				})
				.finally(() => {setIsLoading(false)})
		}
	}

	const _socialAction = (action: 'github' | 'google') => {
		setIsLoading(true)

		// Next auth Social sign in
		signIn(action, { redirect: false})
			.then((callback) => {
				if (callback?.error) {
					toast.error('Invalid credentials')
				} else if (callback?.ok) {
					toast.success('Welcome!')
				}
			})
			.finally(() => {setIsLoading(false)})
	}

	return (
		<div className={'mt-8 sm:mx-auto sm:w-full sm:max-w-md'}>
			<div className={'bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'}>
				<form className={'space-y-6'} onSubmit={handleSubmit(_onSubmit)}>
					{variant === 'REGISTER' && (
						<Input
							id={'name'}
							label='Name'
							disabled={isLoading}
							register={register}
							errors={errors}/>
					)}

					<Input
						id={'email'}
						label='Email'
						disabled={isLoading}
						register={register}
						errors={errors}/>
					<Input
						id={'password'}
						label='Password'
						type={'password'}
						disabled={isLoading}
						register={register}
						errors={errors}/>

					<div>
						<Button
							disabled={isLoading}
							fullWidth={true}
							type='submit'>
							{variant == 'LOGIN' ? 'Sign in' : 'Register'}
						</Button>
					</div>
				</form>

				<div className={'mt-6'}>
					<div className={'relative'}>
						<div className={'absolute inset-0 flex items-center'}>
							<div className={'w-full border-t boder-gray-300'}></div>
						</div>

						<div className={'relative flex justify-center text-sm'}>
                            <span className={'bg-white px-2 text-gray-500'}>
                                Or continue with
                            </span>
						</div>
					</div>

					<div className={'mt-6 flex gap-2'}>
						<AuthSocialButton
							icon={BsGithub}
							disabled={isLoading}
							onClick={() => _socialAction('github')}/>
						<AuthSocialButton
							icon={BsGoogle}
							disabled={isLoading}
							onClick={() => _socialAction('google')}/>
					</div>
				</div>

				<div className={'flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'}>
					<div>{variant === 'LOGIN' ? 'New to messenger?' : 'Already have an account?'}</div>
					<div
						onClick={_toggleVariant}
						className={'underline cursor-pointer'}>
						{variant === 'LOGIN' ? 'Create an account' : 'Login'}
					</div>
				</div>
			</div>
		</div>
	)
}