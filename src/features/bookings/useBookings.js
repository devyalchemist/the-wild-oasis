import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// 1) Setting the filter object
	const filterValue = searchParams.get("check-in-status") || "all";
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue }; // : { field: "totalPrice", value: 7000, method: "gte" };
	// 2) Setting the sort object
	const sortValue = searchParams.get("sortBy") || "startDate-desc";
	const sortBy = {
		sortby: sortValue.split("-")[0],
		direction: sortValue.split("-")[1],
	};

	// 3) Setting the Page
	const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryFn: () => getBookings({ filter, sortBy, page }),
		queryKey: ["bookings", filter, sortBy, page],
	});

	// Pre-fetching
	if (page < Math.ceil(count / PAGE_SIZE))
		queryClient.prefetchQuery({
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
			queryKey: ["bookings", filter, sortBy, page + 1],
		});
	if (page > 1)
		queryClient.prefetchQuery({
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
			queryKey: ["bookings", filter, sortBy, page - 1],
		});

	return { bookings, error, isLoading, count };
}

// const queryClient = useQueryClient();
// 	queryClient.invalidateQueries({ queryKey: ["bookings"] });
