import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
	const queryClient = useQueryClient();
	const { mutate: updateUser, isPending: isUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["user"],
			});

			toast.success("Updated user data successfully");
		},
		onError: () => {
			// console.log(error.message);
			toast.error("Failed");
		},
	});
	return { updateUser, isUpdating };
}
