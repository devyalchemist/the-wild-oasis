import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
	//  Object.keys(filter).length ==
	let query = supabase
		.from("bookings")
		.select("*, cabins(name), guests(fullName, email)", { count: "exact" });
	// 1) The filter operation
	if (filter) query = query[filter.method || "eq"](filter.field, filter.value);
	// 2) The Sort operation
	if (sortBy)
		query = query.order(sortBy.sortby, {
			ascending: sortBy.direction === "asc",
		});
	// 3) The pagination operation
	let from = PAGE_SIZE * (page - 1); // 0 , 10
	let to = PAGE_SIZE + from - 1; // 9 , 19
	if (page) {
		query = query.range(from, to);
	}

	let { data, error, count } = await query;

	if (error) {
		console.log(error);
		throw new Error("Could not load cabins");
	}
	return { data, count };
}

export async function getBooking(id) {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, cabins(*), guests(*)")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking not found");
	}

	return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
	const { data, error } = await supabase
		.from("bookings")
		.select("created_at, totalPrice, extrasPrice")
		.gte("created_at", date)
		.lte("created_at", getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
	const { data, error } = await supabase
		.from("bookings")
		// .select('*')
		.select("*, guests(fullName)")
		.gte("startDate", date)
		.lte("startDate", getToday()); // changed to getTodayAny

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, guests(fullName, nationality, countryFlag)")
		.or(
			// `and(status.eq.unconfirmed,startDate.eq.${getTodayAny()}),and(status.eq.checked-in,endDate.eq.${getTodayAny()})` // here is changed the getToday to getTodayAny
			// `and(status.eq.unconfirmed,startDate.lte.${getTodayAny()}),and(status.eq.checked-in,endDate.gte.${getTodayAny()})` // this would not be adequate since some bookings can be placed for the future, so this will not be fulfilled.

			// this also is a very strict selection since ppl may not book within the range.
			// `and(status.eq.unconfirmed,startDate.gte.${getToday()},endDate.lte.${getToday(
			// 	{ end: true }
			// )}),and(status.eq.checked-in,startDate.gte.${getToday()},endDate.lte.${getToday(
			// 	{ end: true }
			// )})`

			`and(status.eq.unconfirmed,startDate.gte.${getToday()}),and(status.eq.checked-in,startDate.gte.${getToday()})`
		)
		.order("created_at");

	// Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
	// (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
	// (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}
	return data;
}

export async function updateBooking(id, obj) {
	const { data, error } = await supabase
		.from("bookings")
		.update(obj)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be updated");
	}
	return data;
}

export async function deleteBooking(id) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from("bookings").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}
	return data;
}
