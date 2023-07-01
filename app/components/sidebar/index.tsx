import DesktopSidebar from "@messenger-clone/app/components/sidebar/DesktopSidebar";
import MobileNavigation from "@messenger-clone/app/components/mobile-navigation/MobileNavigation";

interface Props {
	children: React.ReactNode
}

export default async function Sidebar({children}: Props) {
	return (
		<aside className={'h-full'}>
			<DesktopSidebar />
			<MobileNavigation />
			<main className={'lg:pl-20 h-full'}>
				{children}
			</main>
		</aside>
	)
}