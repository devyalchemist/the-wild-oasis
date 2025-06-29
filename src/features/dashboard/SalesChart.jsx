import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useToggle } from "../../context/ToggleProvider";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;
	height: 450px;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;



export default function SalesChart({ bookings, numDays }) {
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays),
		end: new Date(),
	});
	console.log(allDates);
	// using the array we can now create our data:
	const data = allDates.map((date) => {
		return {
			label: format(date, "MMM dd"),
			totalSales: bookings
				.filter((booking) => isSameDay(date, new Date(booking.created_at)))
				.reduce((acc, cur) => acc + cur.totalPrice, 0),
			extrasSales: bookings
				.filter((booking) => isSameDay(date, new Date(booking.created_at)))
				.reduce((acc, cur) => acc + cur.extrasPrice, 0),
		};
	});
	console.log(data);
	const { isDark } = useToggle();
	const colors = isDark
		? {
				totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
				extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
				text: "#e5e7eb",
				background: "#18212f",
		  }
		: {
				totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
				extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
				text: "#374151",
				background: "#fff",
		  };
	return (
		<StyledSalesChart>
			<Heading as="h2">
				Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
				{format(allDates.at(-1), "MMM dd yyyy")}
			</Heading>
			<ResponsiveContainer height={"100%"} width={"100%"}>
				<AreaChart data={data}>
					<XAxis
						dataKey={"label"}
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>
					<YAxis unit={"$"} />
					<CartesianGrid
						strokeDasharray={"4"}
						contentStyleType={{ backgroundColor: colors.background }}
					/>
					<Tooltip />
					<Area
						dataKey={"totalSales"}
						type={"monotone"}
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
						strokeWidth={2}
						name="Total sales"
						unit={"$"}
					/>
					<Area
						dataKey={"extrasSales"}
						type={"monotone"}
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
						strokeWidth={2}
						name="Extras sales"
						unit={"$"}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}
