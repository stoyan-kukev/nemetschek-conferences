"use server";

export async function changePassword(
	formData: FormData
): Promise<ActionResult> {
	const currentPassword = formData.get("current-password");

	return {
		error: "",
	};
}
