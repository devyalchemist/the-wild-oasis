import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, { status: "checked-out" }),
		onSuccess: (data) => {
			toast.success(`Checked out #${data.id}`);
			queryClient.invalidateQueries({
				active: true,
			});
		},
		onError: () => toast.error("Failed"),
	});
	return { mutate, isPending };
}
