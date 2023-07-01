import Sidebar from "@messenger-clone/app/components/sidebar";
import getUsers from "@messenger-clone/app/actions/getUsers";
import UserList from "@messenger-clone/app/users/components/UserLists";

interface Props {
	children: React.ReactNode
}

export default async function UserLayout({children}: Props) {
	const users = await getUsers()

	return (
		<Sidebar>
			<div className={'h-full'}>
				<UserList users={users}/>
				{children}
			</div>
		</Sidebar>
	)
}