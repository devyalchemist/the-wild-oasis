import supabase from "./supabase";

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
	console.log(data);
	if (error) throw new Error(error.message);
	return data?.user;
}
