import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import { useUser } from "./useUser";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
	const { logoutUser, isLoggingOut } = useLogout();

	const { isAuthenticated } = useUser();
	function handleLogout() {
		if (!isAuthenticated) return null;
		logoutUser();
	}
	return (
		<ButtonIcon disabled={isLoggingOut} onClick={handleLogout}>
			{!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
		</ButtonIcon>
	);
}
