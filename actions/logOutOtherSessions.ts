"use server";

import { db, lucia, validateRequest } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";

const FormSchema = z.object({
	current_password: z
		.string({
			invalid_type_error: "Invalid current password",
		})
		.refine(async (password) => {
			const { user } = await validateRequest();
			if (!user) return false;

			const { current_password } = await db
				.selectDistinct({
					current_password: userTable.password_hash,
				})
				.from(userTable)
				.where(eq(userTable.id, user.id))
				.then((val) => val[0]);

			const isValidPassword = await verify(current_password, password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1,
			});

			return isValidPassword;
		}, "Current password is wrong"),
});

export type State = {
	errors?: {
		current_password?: string[];
	};
	message?: string[] | null;
};

export async function logOutOtherSessions(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const { user } = await validateRequest();
	if (!user) return {};

	const validatedFields = await FormSchema.safeParseAsync({
		current_password: formData.get("current_password"),
	});

	if (!validatedFields.success) {
		const { fieldErrors, formErrors } = validatedFields.error.flatten();

		return {
			errors: fieldErrors,
			message: formErrors,
		};
	}

	await lucia.invalidateUserSessions(user.id);
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	const { name, value, attributes } = sessionCookie;
	cookies().set(name, value, attributes);

	return {
		message: ["Logged out of other sessions successfully!"],
	};
}
