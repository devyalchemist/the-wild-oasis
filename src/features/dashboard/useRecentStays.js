import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
	// const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();
	const numDays = !searchParams.get("last")
		? 7
		: Number(searchParams.get("last"));
	console.log(numDays);
	const queryDate = subDays(new Date(), numDays).toISOString();
	const { isLoading: loadingStays, data: stays } = useQuery({
		queryFn: () => getStaysAfterDate(queryDate),
		queryKey: ["stays", `last-${numDays}`],
	});

	//Testing out the queryClient prefetch on my own

	// if (numDays >= 7)
	// 	queryClient.prefetchQuery({
	// 		queryFn: () =>
	// 			getStaysAfterDate(subDays(new Date(), numDays + 7).toISOString()),
	// 		queryKey: ["stays", `last-${numDays + 7}`],
	// 	});

	const confirmedStays = stays?.filter(
		(stay) => stay.status === "checked-in" || stay.status === "checked-out"
	);

	return { loadingStays, stays, confirmedStays, numDays };
}
