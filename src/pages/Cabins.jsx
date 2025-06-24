import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";

import AddCabinFom from "../features/cabins/AddCabinForm";
import TableOperations from "../ui/TableOperations";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";

function Cabins() {
	const filterOptions = [
		{ label: "all", value: "All" },
		{ label: "with-discount", value: "With discount" },
		{ label: "no-discount", value: "No discount" },
	];
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<TableOperations>
					<Filter filterOptions={filterOptions} filterValue={"discount"} />
					<SortBy
						options={[
							{ option: "Sort by name (A-Z)", value: "name-asc" },
							{ option: "Sort by name (Z-A)", value: "name-desc" },
							{
								option: "Sort by price (low first)",
								value: "regularPrice-asc",
							},
							{
								option: "Sort by price (high first)",
								value: "regularPrice-desc",
							},
							{
								option: "Sort by capacity (low first)",
								value: "maxCapacity-asc",
							},
							{
								option: "Sort by capacity (high first)",
								value: "maxCapacity-desc",
							},
						]}
					/>
				</TableOperations>
			</Row>
			<Row>
				<CabinTable />
				<AddCabinFom />
			</Row>
		</>
	);
}

export default Cabins;
