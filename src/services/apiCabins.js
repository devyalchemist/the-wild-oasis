import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	let { data, error } = await supabase.from("cabins").select("*");
	if (error) {
		console.log(error);
		throw new Error("Could not load cabins");
	}
	return data;
}

export async function deleteCabin(id) {
	const { error } = await supabase.from("cabins").delete().eq("id", id);
	if (error) {
		console.log(error);
		throw new Error("Cabin could not be deleted");
	}
}
// const fullPrePath = `${supabaseUrl}/storage/v1/object/public/cabin.images//`;
// const filename = cabinObj.name.slice(80);
// console.log(fullPrePath.length);

// const { data, error } = await supabase
// 		.from("cabins")
// 		.insert([{ ...cabinObj, image: filePath }])
// 		.select()
export async function createEditCabin(cabinObj, id) {
	//Checking the two situations of the image prop of the data
	const hasImgPath = cabinObj.image?.startsWith?.(supabaseUrl);
	console.log(cabinObj.image.name);
	// Creating the filename form the cabinObj
	const fileName = hasImgPath
		? cabinObj.name.slice(80)
		: `${Date.now()}${cabinObj.image?.name?.replaceAll("/", "")}`;
	console.log(fileName);
	const filePath = hasImgPath
		? cabinObj.image
		: `${supabaseUrl}/storage/v1/object/public/cabin.images//${fileName}`;
	console.log(filePath);
	//Creating the select from supabase prefix:
	let query = supabase.from("cabins");

	//A) Create cabin
	if (!id) query = query.insert([{ ...cabinObj, image: filePath }]);

	//B) Edit existing cabin by ID
	if (id) query = query.update({ ...cabinObj, image: filePath }).eq("id", id);

	// Select the result from the superbase query
	const { data, error } = await query.select().single();

	if (error) {
		console.log(error);
		throw new Error("Could not insert new Cabin");
	}

	//Store to the bucket
	if (hasImgPath) return data;
	const { error: uploadError } = await supabase.storage
		.from("cabin.images")
		.upload(fileName, cabinObj.image);
	if (uploadError) {
		await supabase.from("cabins").delete().eq("id", data.id);

		console.log("Upload error:", uploadError);
		throw new Error(
			"Could not upload image to bucket storage and the cabin was not created"
		);
	}

	return data;
}

// async function uploadFile(file, fileName) {}

//my method of doing the upload to bucket operation:

// //2. Upload file to bucket storage
// const fileUploadError = await uploadFile(cabinObj.image, fileName);
// //3. Error in uploading to bucket
// if (fileUploadError) {
// 	await supabase.from("cabins").delete().eq("id", data.id);
// 	console.log(fileUploadError);
// 	throw new Error(
// 		"Could not upload image to bucket storage and the cabin was not created"
// 	);
// }
