import DesktopSidebar from "@messenger-clone/app/components/sidebar/DesktopSidebar";
import MobileNavigation from "@messenger-clone/app/components/mobile-navigation/MobileNavigation";
import getCurrentUser from "@messenger-clone/app/actions/getCurrentUser";

interface Props {
	children: React.ReactNode
}

export default async function Sidebar({children}: Props) {
	const currentUser = await getCurrentUser()

	return (
		<aside className={'h-full'}>
			<DesktopSidebar currentUser={currentUser!} />
			<MobileNavigation />
			<main className={'lg:pl-20 h-full'}>
				{children}
			</main>
		</aside>
	)
}