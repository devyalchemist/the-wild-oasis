import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: "",
			},
		},
	});

	if (error) {
		throw new Error(error.message);
	}
	console.log(data);

	//{user: {…}, session: null}, isAuthenticated is not provided, in the real world we want to now authenticate that user.
	return data;
}

export async function login({ email, password }) {
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) {
		throw new Error(error.message);
	}
	console.log(data);
	return data;
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null;
	// while we can get the authenticated user from the sesssion, it is safer to redownload the data from supabase
	const { error, data } = await supabase.auth.getUser();
	// console.log(data);
	if (error) throw new Error(error.message);
	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
	const BASE_UPLOAD_URL = `${supabaseUrl}/storage/v1/object/public/avatars//`;
	const DEFAULT_AVATAR_URL = `https://lsypvxpptofjfakmrpnf.supabase.co/storage/v1/object/public/avatars//avatar.jpg`;
	const avatarIsDefault = avatar?.avatar === "default";
	console.log(avatar);
	const avatarIsPathUrl = avatarIsDefault
		? false
		: avatar?.includes?.(BASE_UPLOAD_URL) ||
		  avatar?.name?.includes?.(BASE_UPLOAD_URL);
	//1) Update the password or fullName
	let updateData;
	if (password) updateData = { password };
	if (fullName)
		updateData = {
			data: {
				fullName,
			},
		};
	const { data, error } = await supabase.auth.updateUser(updateData);
	console.log(data);
	if (error) throw new Error(error.message);
	const { user } = data;
	if (!avatar || avatarIsPathUrl) return user; // if there is an avatar then we shouldn't do anything, ie just update the fullName, also if there is no avatar we shouldn't do anything

	//2) Update the avatar image
	let fileName;
	if (!avatarIsDefault) {
		fileName = `avatar-${data.user.id}-${Date.now()}`;
		const { error: storageError } = await supabase.storage
			.from("avatars")
			.upload(fileName, avatar); // the avatar is the file itself ie
		if (storageError) throw new Error(storageError.message);
	}

	//3) Update avatar in the user
	// https://lsypvxpptofjfakmrpnf.supabase.co/storage/v1/object/public/avatars//cabin-001.jpg
	const { data: userData, error: avatarUploadError } =
		await supabase.auth.updateUser({
			data: {
				avatar: avatarIsDefault
					? DEFAULT_AVATAR_URL
					: `${BASE_UPLOAD_URL}${fileName}`,
			},
		});
	const { user: updatedUser } = userData;
	if (avatarUploadError) throw new Error(avatarUploadError.message);
	return updatedUser;
}
