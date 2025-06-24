import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabinFom() {
	return (
		<div>
			<Modal>
				<Modal.Option value="cabin">
					<Button>Add new Cabin</Button>
				</Modal.Option>
				<Modal.Window name="cabin">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}
