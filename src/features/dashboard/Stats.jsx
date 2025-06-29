import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
	bookings,
	confirmedStays,
	numDays,
	cabinCount,
}) {
	// 1)
	const numBookings = bookings.length;
	//2)
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

	//3
	const checkings = confirmedStays.length;

	//4
	const occupation =
		confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
		(numDays * cabinCount);
	//num checked in nights / all available nights (num days * num cabin)
	return (
		<>
			<Stat
				title={"Bookings"}
				color={"blue"}
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title={"Sales"}
				color={"green"}
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title={"Check-ins"}
				color={"indigo"}
				icon={<HiOutlineCalendarDays />}
				value={checkings}
			/>
			<Stat
				title={"Occupancy rates"}
				color={"yellow"}
				icon={<HiOutlineChartBar />}
				value={Math.round(occupation * 100) + "%"}
			/>
		</>
	);
}
