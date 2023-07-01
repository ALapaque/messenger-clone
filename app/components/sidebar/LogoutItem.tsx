import DesktopItem from "@messenger-clone/app/components/sidebar/DesktopItem";
import useRoutes from "@messenger-clone/app/hooks/useRoutes";

export default function LogoutItem() {
	const routes = useRoutes()
	const logoutItem = routes.find((route) => route.label === 'Logout')

	if (!logoutItem) {
		return null
	}

	return (
		<DesktopItem {...logoutItem} />
	)
}