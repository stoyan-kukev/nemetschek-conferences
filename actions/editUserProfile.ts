"use server";

import { db, validateRequest } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const FormSchema = z.object({
	first_name: z
		.string({
			invalid_type_error: "Невалидно име",
		})
		.min(2, "Името ви е твърде кратко"),
	last_name: z
		.string({
			invalid_type_error: "Невалидна фамилия",
		})
		.min(2, "Фамилията ви е тврде кратка"),
	username: z
		.string({
			invalid_type_error: "Невалидно потребителско име",
		})
		.regex(/^[a-z0-9_-]+$/, "Невалидно потребителско име")
		.refine(async (username) => {
			const { user } = await validateRequest();
			if (!user) return;

			const foundUser = db
				.select()
				.from(userTable)
				.where(eq(userTable.username, username))
				.get();

			return !foundUser || username == user.username;
		}, "Потребителското име е вече взето"),
});

export type State = {
	errors?: {
		first_name?: string[];
		last_name?: string[];
		username?: string[];
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

	const { username, first_name, last_name } = validatedFields.data;

	await db
		.update(userTable)
		.set({ username, firstName: first_name, lastName: last_name })
		.where(eq(userTable.id, user.id));

	return {
		message: ["Личната ви информация беше сменена успешно!"],
	};
}
