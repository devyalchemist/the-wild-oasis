import Button from "../../ui/Button";
import Row from "../../ui/Row";

export default function ConfirmDeleteCabinForm({ cabin, deleting, onClose }) {
	return (
		<Row>
			<div>Are you sure you want to erase Cabins {name}</div>
			<Row type="horizontal">
				<Button onClick={onClose}>Cancel</Button>
				<Button variation="danger" onClick={() => deleting(cabin.id)}>
					Delete
				</Button>
			</Row>
		</Row>
	);
}
