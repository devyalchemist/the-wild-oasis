import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
	// const bookings = [];
	const { bookings, isLoading } = useBookings();
	let filteredBookings;
	const [search] = useSearchParams();
	const status = search.get("check-in-status") || "all";
	if (isLoading) return <Spinner />;

	// const statusArray = ["checked-in", "unconfirmed", "checked-out", "all"]

	// my method of evaluating and checking the check-in status with the params returned value
	/* const statusArray = [
		...bookings.reduce(
			(accumulator, initial) =>
				!accumulator.includes(initial.status)
					? [...accumulator, initial.status]
					: accumulator,
			[]
		),
		"new",
	];
	statusArray.forEach(
		(e) =>
			(filteredBookings =
				bookings.filter((booking) => booking.status === status) || bookings)
	);
	filteredBookings = filteredBookings.length > 0 ? filteredBookings : bookings;
	console.log(statusArray); */

	if (status === "checked-in")
		filteredBookings = bookings.filter((booking) => booking.status === status);
	if (status === "unconfirmed")
		filteredBookings = bookings.filter((booking) => booking.status === status);

	if (status === "checked-out")
		filteredBookings = bookings.filter((booking) => booking.status === status);
	if (status === "all") filteredBookings = bookings;
	if (!bookings.length) return <Empty resource={"bookings"} />;

	return (
		<Menus>
			<Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
				<Table.Header>
					<div>Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={filteredBookings}
					render={(booking) => (
						<BookingRow key={booking?.id} booking={booking} />
					)}
				/>
			</Table>
		</Menus>
	);
}

export default BookingTable;
