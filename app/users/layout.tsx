import Sidebar from "@messenger-clone/app/components/sidebar";

interface Props {
	children: React.ReactNode
}

export default async function UserLayout({children}: Props) {
	return (
		<Sidebar>
			<div className={'h-full'}>
				{children}
			</div>
		</Sidebar>
	)
}