import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabin } from "../cabins/useCabin";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

export default function DashboardLayout() {
	const { isLoading, bookings } = useRecentBookings();
	const { loadingStays, stays, confirmedStays, numDays } = useRecentStays();
	const { isLoading: isLoadingCabin, cabins } = useCabin();
	if (isLoading || loadingStays || isLoadingCabin) return <Spinner />;
	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins.length}
			/>
		</StyledDashboardLayout>
	);
}
