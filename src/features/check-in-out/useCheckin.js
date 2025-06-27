import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: ({ bookingId, updateStatus }) =>
			updateBooking(bookingId, updateStatus),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id}`);
			queryClient.invalidateQueries({
				// queryKey: ["booking"],
				predicate: (query) => query.queryKey[0] === "bookings",
			});
			navigate(`/`);
		},
		onError: () => toast.error("Failed"),
	});
	return { mutate, isPending };
}
