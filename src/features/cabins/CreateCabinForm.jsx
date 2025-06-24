import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
	// const { close } = useContext(ModalContext);
	const { id: editId, ...editValues } = cabinToEdit;
	const editSession = Boolean(editId);
	const { register, handleSubmit, reset, formState, watch } = useForm({
		defaultValues: editSession ? editValues : {},
	});
	const { creating, isCreating } = useCreateCabin();
	const { editing, isEditing } = useEditCabin();
	const regularPrice = watch("regularPrice");
	const { errors } = formState;

	const isWorking = isEditing || isCreating;

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];
		if (editSession) {
			editing(
				{ data: { ...data, image: image }, id: editId },
				{
					onSuccess: () => {
						reset();
						onClose?.();
					},
				}
			);
		} else {
			creating(
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset();
						onClose?.();
					},
				}
			);
		}
	}
	function onError(error) {
		console.log(error);
	}
	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onClose ? "modal" : "regular"}>
			<FormRow label="Cabin Name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					errors={errors}
					{...register("maxCapacity", {
						min: {
							value: 1,
							message: "Please provide a value higher than one",
						},
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Regular Price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					disabled={isWorking}
					id="regularPrice"
					{...register("regularPrice", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					disabled={isWorking}
					id="discount"
					errors={errors}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							parseInt(value) <= parseInt(regularPrice) ||
							"Discount must be less than the regular price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}>
				<Textarea
					type="number"
					errors={errors}
					id="description"
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin Photo" error={errors?.image?.message}>
				<FileInput
					id="image"
					type="file"
					disabled={isWorking}
					errors={errors}
					accept="image/*"
					{...register("image", {
						required: editSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset" onClick={() => onClose?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{editSession ? "Edit Cabin" : "Add cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
