import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterValue={"check-in-status"}
				filterOptions={[
					{ value: "All", label: "all" },
					{ value: "Unconfirmed", label: "unconfirmed" },
					{ value: "Checked out", label: "checked-out" },
					{ value: "Checked in", label: "checked-in" },
				]}
			/>

			<SortBy
				options={[
					{ value: "startDate-desc", option: "Sort by date (recent first)" },
					{ value: "startDate-asc", option: "Sort by date (earlier first)" },
					{
						value: "totalPrice-desc",
						option: "Sort by amount (high first)",
					},
					{ value: "totalPrice-asc", option: "Sort by amount (low first)" },
				]}
			/>
		</TableOperations>
	);
}

export default BookingTableOperations;
