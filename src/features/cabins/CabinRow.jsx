import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";


const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
	const [setShowForm] = useState(false);
	const { creating } = useCreateCabin();
	const {
		id: cabinId,
		name,
		maxCapacity,
		regularPrice,
		discount,
		image,
		description,
	} = cabin;
	const { isDeleting, deleting } = useDeleteCabin();
	function handleCreate() {
		creating({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			image,
			description,
		});
	}
	return (
		<>
			<Table.Row>
				<Img src={image} />
				<Cabin>{name}</Cabin>
				<div>Fits up to {maxCapacity} guests</div>
				<Price>{formatCurrency(regularPrice)}</Price>
				{discount ? (
					<Discount>{formatCurrency(discount)}</Discount>
				) : (
					<span>&mdash; </span>
				)}
				<div>
					{/* <button onClick={handleCreate} disabled={isCreating}>
						<HiSquare2Stack />
					</button> */}
					<Modal>
						<Menus.Menu>
							<Menus.Toggle id={cabinId} />
							<Menus.List id={cabinId}>
								<Menus.Button icon={<HiSquare2Stack />} onClick={handleCreate}>
									Duplicate
								</Menus.Button>
								<Modal.Option value="edit">
									<Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
								</Modal.Option>
								<Modal.Option value={"delete"}>
									<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
								</Modal.Option>
							</Menus.List>
						</Menus.Menu>

						<Modal.Window name="edit">
							<CreateCabinForm setShow={setShowForm} cabinToEdit={cabin} />
						</Modal.Window>

						<Modal.Window name={"delete"}>
							<ConfirmDelete
								resourceName={"Cabins"}
								onConfirm={() => deleting(cabinId)}
								disabled={isDeleting}
							/>

							{/* <ConfirmDeleteCabinForm cabin={cabin} deleting={deleting} /> */}
						</Modal.Window>
					</Modal>
				</div>
			</Table.Row>
		</>
	);
}
