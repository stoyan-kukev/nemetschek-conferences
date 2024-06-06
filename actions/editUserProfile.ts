"use server";

import { db, validateRequest } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function isValidEmail(input: string) {
	const regex = /^(?! )[^\s@]{1,254}@[^@\s]+\.[^@\s]+(?<! )$/;
	return regex.test(input) && input.length <= 255;
}

export async function editUserProfile(
	formData: FormData
): Promise<ActionResult> {
	console.log(formData);

	const { session, user } = await validateRequest();
	if (!session) {
		console.log("session");
		return {
			error: "You must be authenticated to edit your profile",
		};
	}

	const firstName = formData.get("first-name");
	if (
		typeof firstName !== "string" ||
		firstName.length < 2 ||
		firstName.length > 40
	) {
		return {
			error: "Invalid fisrt name",
		};
	}

	const lastName = formData.get("last-name");
	if (
		typeof lastName !== "string" ||
		lastName.length < 2 ||
		lastName.length > 40
	) {
		return {
			error: "Invalid last name",
		};
	}

	const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username",
		};
	}

	const foundUsername = await db
		.selectDistinct()
		.from(userTable)
		.where(eq(userTable.username, username));

	if (foundUsername[0] && foundUsername[0].id != user.id) {
		return {
			error: "Username taken",
		};
	}

	const email = formData.get("email");
	if (typeof email !== "string" || !isValidEmail(email)) {
		console.log("email");
		return {
			error: "Invalid email",
		};
	}

	await db
		.update(userTable)
		.set({ email, username, firstName, lastName })
		.where(eq(userTable.id, user.id));

	return {
		error: "",
	};
}
