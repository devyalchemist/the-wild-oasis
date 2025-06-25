import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
	const {
		isLoading: isLoadingUser,
		data: user,
		error,
	} = useQuery({
		queryFn: getCurrentUser,
		queryKey: ["user"],
	});
	return {
		isLoadingUser,
		user,
		isAuthenticated: user?.role === "authenticated",
	};
}
