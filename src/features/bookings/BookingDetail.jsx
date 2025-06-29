import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { isLoading, booking } = useBooking();
	const { mutate: checkOut, isPending: isCheckingOut } = useCheckout();
	const { delBooking, isPending: isDeletingBooking } = useDeleteBooking();
	const navigate = useNavigate();
	// const status = "checked-in";
	console.log(booking);

	const moveBack = useMoveBack();
	if (isLoading) return <Spinner />;
	console.log(booking);
	if (!booking) return <Empty resource={"booking"} />;

	const { status, id: bookingId } = booking;
	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking {bookingId}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />
			<Modal>
				<ButtonGroup>
					{status === "unconfirmed" && (
						<Button onClick={() => navigate(`/checkin/${bookingId}`)}>
							Check In
						</Button>
					)}
					{status === "checked-in" && (
						<Button
							icon={<HiArrowUpOnSquare />}
							onClick={() => checkOut(bookingId)}
							disabled={isCheckingOut}>
							Check Out
						</Button>
					)}

					<Button variation="secondary" onClick={moveBack}>
						Back
					</Button>
					<Modal.Option value={"delBk2"}>
						<Button icon={<HiTrash />} variation={"danger"}>
							Delete
						</Button>
					</Modal.Option>
				</ButtonGroup>
				<Modal.Window name={"delBk2"}>
					<ConfirmDelete
						resourceName={"Booking"}
						onConfirm={() =>
							delBooking(bookingId, { onSettled: () => navigate(-1) })
						}
						disabled={isDeletingBooking}
					/>
				</Modal.Window>
			</Modal>
		</>
	);
}

export default BookingDetail;
