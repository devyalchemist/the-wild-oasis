import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
	// We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
	const {
		user: {
			email,
			user_metadata: { fullName: currentFullName, avatar: currentAvatar },
		},
	} = useUser();

	const [fullName, setFullName] = useState(currentFullName);
	const [avatar, setAvatar] = useState(currentAvatar);
	const { isUpdating, updateUser } = useUpdateUser();
	// useEffect(() => {
	// 	ref.files[0] =
	// });

	function handleSubmit(e) {
		e.preventDefault();
		console.log(`data: ${JSON.stringify({ fullName, avatar })}`);
		if (!fullName) return null;
		updateUser(
			{ fullName, avatar },
			{
				onSuccess: () => {
					setAvatar(null);
					e.target.reset();
				},
			}
		);
	}
	function removeAvatar() {
		const avatar = { avatar: "default" };
		setAvatar(avatar);
		console.log(avatar);
		updateUser({ fullName, avatar });
	}

	function handleCancel() {
		setFullName(currentFullName);
		setAvatar(null);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label="Email address">
				<Input value={email} disabled />
			</FormRow>
			<FormRow label="Full name">
				<Input
					type="text"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					id="fullName"
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Avatar image">
				<FileInput
					id="avatar"
					accept="image/*"
					onChange={(e) => {
						setAvatar(e.target.files[0]);
						console.log(e.target.files[0]);
					}}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow>
				<Button
					onClick={handleCancel}
					type="reset"
					variation="secondary"
					disabled={isUpdating}>
					Cancel
				</Button>
				<Button disabled={isUpdating}>Update account</Button>
				<Button variation="danger" onClick={removeAvatar} disabled={isUpdating}>
					Remove Avatar
				</Button>
			</FormRow>
		</Form>
	);
}

export default UpdateUserDataForm;
