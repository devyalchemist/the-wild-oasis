import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: login, isPending } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: (user) => {
			console.log(user);
			toast.success("Login successful");
			queryClient.setQueryData(["user"], user.user);
			// queryClient.invalidateQueries({ queryKey: ["user"] });
			navigate("/dashboard");
		},
		onError: (error) => {
			console.log(error);
			toast.error("The provided email and password are incorrect");
		},
	});

	return { login, isPending };
}
