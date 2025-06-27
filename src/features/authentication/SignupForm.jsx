import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignupForm } from "./useSignupForm";

import { useNavigate } from "react-router-dom";
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
	const { formState, getValues, handleSubmit, register, reset } = useForm();

	// const navigate = useNavigate();

	const { signUp, signingUp } = useSignupForm();
	const { errors } = formState;

	function validateForm({ fullName, email, password }) {
		signUp({ fullName, email, password });

		reset();
	}

	return (
		<Form onSubmit={handleSubmit(validateForm)}>
			<FormRow label="Full name" error={errors?.fullName?.message}>
				<Input
					type="text"
					id="fullName"
					{...register("fullName", {
						required: "This field is required",
					})}
					disabled={signingUp}
				/>
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					type="email"
					id="email"
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Please provide a valid email address",
						},
					})}
					disabled={signingUp}
				/>
			</FormRow>

			<FormRow
				label="Password (min 8 characters)"
				error={errors?.password?.message}>
				<Input
					type="password"
					id="password"
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message: "Password must be longer than 8 character",
						},
					})}
					disabled={signingUp}
				/>
			</FormRow>

			<FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
				<Input
					type="password"
					id="passwordConfirm"
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: (data) =>
							data === getValues().password ||
							"Password must match the previous one",
					})}
					disabled={signingUp}
				/>
				{/* watch("password") */}
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button>Create new user</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
