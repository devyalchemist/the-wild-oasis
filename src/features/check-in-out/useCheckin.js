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
				predicate: (query) =>
					query.queryKey[0] === "bookings" ||
					query.queryKey[0] === "today-activity", // added this line to invalidate the display for the today activity displayed on the dashboard page
			});
			navigate(`/`);
		},
		onError: () => toast.error("Failed"),
	});
	return { mutate, isPending };
}
