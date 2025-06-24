import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

export default function CabinTable() {
	const [searchParams] = useSearchParams();
	const { isLoading, cabins } = useCabin();
	const filter = searchParams.get("discount") || "all";
	const sortValue = searchParams.get("sortBy") || "startDate-asc";
	let filteredCabin;
	if (isLoading) return <Spinner />;

	if (filter === "no-discount")
		filteredCabin = cabins.filter((cabin) => cabin.discount === 0);
	if (filter === "all") filteredCabin = cabins;
	if (filter === "with-discount")
		filteredCabin = cabins.filter((cabin) => cabin.discount > 0);

	const [sortType, direction] = sortValue.split("-");
	const modifier = direction === "asc" ? 1 : -1;
	const sortedCabins = filteredCabin.sort(
		(a, b) => (a[sortType] - b[sortType]) * modifier
	);

	if (!cabins.length) return <Empty resource={"cabins"} />;

	return (
		<Menus>
			<Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
				<Table.Header role="row">
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					data={sortedCabins}
					render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
		</Menus>
	);
}
