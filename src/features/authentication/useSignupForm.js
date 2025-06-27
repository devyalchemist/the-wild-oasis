import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignupForm() {
	const { isPending: signingUp, mutate: signUp } = useMutation({
		mutationFn: ({ fullName, email, password }) =>
			signUpApi({ fullName, email, password }),
		onSuccess: (data) => {
			if (data.user.identities.length === 0) {
				toast.success("User already existed");
			} else {
				toast.success(
					"Sign up successfully, Please verify the new account from the user's email address "
				);
			}
		},
		onError: (error) => {
			toast.error(error?.message);
		},
	});
	return { signingUp, signUp };
}
