import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
	const { id } = useParams();
	const {
		data: booking,
		isLoading,
		error,
	} = useQuery({
		queryFn: () => getBooking(id),
		queryKey: ["booking", id],
		retry: false,
	});
	return { booking, isLoading, error };
}
