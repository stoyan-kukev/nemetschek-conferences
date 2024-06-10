"use server";

import { db, validateRequest } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

function isValidEmail(input: string) {
	const regex = /^(?! )[^\s@]{1,254}@[^@\s]+\.[^@\s]+(?<! )$/;
	return regex.test(input) && input.length <= 255;
}

const FormSchema = z.object({
	first_name: z
		.string({
			invalid_type_error: "Invalid first name",
		})
		.optional(),
	last_name: z
		.string({
			invalid_type_error: "Invalid first name",
		})
		.optional(),
	username: z
		.string({
			invalid_type_error: "Invalid username",
		})
		.regex(/^[a-z0-9_-]+$/, "Invalid username")
		.refine((username) => {
			const foundUser = db
				.select()
				.from(userTable)
				.where(eq(userTable.username, username))
				.get();

			return !foundUser || foundUser.username == username;
		}, "Username taken"),
	email: z
		.string({
			invalid_type_error: "Invalid email",
		})
		.refine((email) => isValidEmail(email), "Invalid email")
		.optional(),
});

export type State = {
	errors?: {
		first_name?: string[];
		last_name?: string[];
		username?: string[];
		email?: string[];
	};
	message?: string[] | null;
};

export async function editUserProfile(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const { session, user } = await validateRequest();
	if (!session) return {};

	const validatedFields = await FormSchema.safeParseAsync({
		username: formData.get("username"),
		email: formData.get("email"),
		first_name: formData.get("first_name"),
		last_name: formData.get("last_name"),
	});

	if (!validatedFields.success) {
		const { fieldErrors, formErrors } = validatedFields.error.flatten();

		return {
			errors: fieldErrors,
			message: formErrors,
		};
	}

	const { username, email, first_name, last_name } = validatedFields.data;

	console.log(username, email, first_name, last_name);

	await db
		.update(userTable)
		.set({ username, email, firstName: first_name, lastName: last_name })
		.where(eq(userTable.id, user.id));

	return {
		message: ["Profile edited successfully!"],
	};
}
