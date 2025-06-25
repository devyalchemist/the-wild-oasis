import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
	const queryClient = useQueryClient();
	const { mutate: delBooking, isPending } = useMutation({
		mutationFn: deleteBooking,
		onSuccess: () => {
			toast.success("Successfully deleted booking ");
			queryClient.invalidateQueries({ active: true });
		},
		onError: () => {
			toast.error("Failed to delete booking");
		},
	});
	return { delBooking, isPending };
}
