import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
	const queryClient = useQueryClient();
	const { mutate: editing, isPending: isEditing } = useMutation({
		mutationFn: ({ data, id }) => createEditCabin(data, id),
		onSuccess: () => {
			toast.success("Successfully edited the cabin");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	return { editing, isEditing };
}
