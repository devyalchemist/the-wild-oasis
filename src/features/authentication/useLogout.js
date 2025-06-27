import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: logoutUser, isPending: isLoggingOut } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			toast.success("User Logged out");
			queryClient.removeQueries();
			navigate("/login", { replace: true });
		},
	});
	return { logoutUser, isLoggingOut };
}
