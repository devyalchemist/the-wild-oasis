import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";

import { useCheckin } from "./useCheckin";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [confirmedPaid, setConfirmedPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);
	const { data: settings, isLoading: isLoadingSetting } = useSetting();

	const moveBack = useMoveBack();
	const { booking, isLoading } = useBooking();
	const { isPending, mutate } = useCheckin();
	useEffect(() => {
		setConfirmedPaid(booking?.isPaid ?? false); // this line makes sure the confirmedPaid isnt undefined, nullish coalescing operator
	}, [booking?.isPaid]);
	if (isLoading || isLoadingSetting) return <Spinner />;
	const optionalBreakFastPrice = settings.breakfastPrice;
	const { id: bookingId, guests, totalPrice, hasBreakfast } = booking;

	function handleCheckin() {
		if (!confirmedPaid) return;
		let updateStatus = { status: "checked-in", isPaid: true };
		if (addBreakfast) {
			updateStatus = {
				...updateStatus,
				hasBreakfast: true,
				extrasPrice: optionalBreakFastPrice,
				totalPrice: totalPrice + optionalBreakFastPrice,
			};
			mutate({ bookingId, updateStatus });
		} else {
			mutate({ bookingId, updateStatus });
		}
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>
			<BookingDataBox booking={booking} />
			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((prev) => !prev);
							// setConfirmedPaid(!addBreakfast ? false : true);
							setConfirmedPaid(false);
						}}
						disabled={hasBreakfast && confirmedPaid}
						id="breakfast">
						Want to add breakfast for {formatCurrency(optionalBreakFastPrice)}
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					checked={confirmedPaid}
					onChange={() => setConfirmedPaid((prev) => !prev)}
					id={"confirm"}
					disabled={confirmedPaid || isPending}>
					I confim that {guests.fullName} has paid the total amount of{" "}
					{!addBreakfast
						? formatCurrency(totalPrice)
						: `${formatCurrency(
								totalPrice + optionalBreakFastPrice
						  )} (${formatCurrency(totalPrice)} + ${formatCurrency(
								optionalBreakFastPrice
						  )})`}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button onClick={handleCheckin} disabled={!confirmedPaid || isPending}>
					Check in booking #{bookingId}
				</Button>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
