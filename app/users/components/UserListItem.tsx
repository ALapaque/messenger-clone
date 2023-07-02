import {User} from "@prisma/client";
import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import Avatar from "@messenger-clone/app/components/Avatar";
import {format} from "util";

interface UserListItemProps {
	user: User
}

export default function UserListItem({user}: UserListItemProps) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const _handleClick = useCallback(() => {
		setIsLoading(true)

		axios.post('/api/conversations', {userId: user.id})
			.then((data) => {
				router.push(`/conversations/${data.data.id}`)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [user, router])

	return (
		<div
			onClick={_handleClick}
			className={'w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'}>
			<Avatar user={user}/>

			<div className={'min-w-0 flex-1'}>
				<div className={'focus:outline-none'}>
					<div className={'flex justify-between items-center mb-1'}>
						<p className={'tex-sm font-medium text-gray-900'}>{user.name}</p>
					</div>
				</div>
			</div>
		</div>
	)
}