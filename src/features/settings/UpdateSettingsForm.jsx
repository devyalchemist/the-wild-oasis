import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSetting } from "./useSetting";

import { useUpdateSetting } from "./useUpdateSetting";
import { updateSetting } from "../../services/apiSettings";

function UpdateSettingsForm() {
	// const { register, handleSubmit, reset, ...others } = useForm();
	const { editSettings, isPending } = useUpdateSetting();
	const {
		isLoading,
		data: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSetting();
	function handleSubmit(e, name) {
		const { value } = e.target;
		if (!value) return;
		editSettings({ [name]: value });
	}
	// function onSubmit(data) {
	// 	// console.log(data);
	// 	editSettings(data);
	// }
	if (isLoading) return <Spinner />;

	return (
		// onSubmit={handleSubmit(onSubmit)}
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					disabled={isPending}
					onBlur={(e) => handleSubmit(e, "minBookingLength")}
					// {...register("minBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					disabled={isPending}
					defaultValue={maxBookingLength}
					onBlur={(e) => handleSubmit(e, "maxBookingLength")}
					// {...register("maxBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					disabled={isPending}
					defaultValue={maxGuestsPerBooking}
					onBlur={(e) => handleSubmit(e, "maxGuestsPerBooking")}
					// {...register("maxGuestsPerBooking")}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					disabled={isPending}
					defaultValue={breakfastPrice}
					onBlur={(e) => handleSubmit(e, "breakfastPrice")}
					// {...register("breakfastPrice")}
				/>
			</FormRow>
			{/* <FormRow>
				<button disabled={isPending}>Submit</button>
			</FormRow> */}
		</Form>
	);
}

export default UpdateSettingsForm;
