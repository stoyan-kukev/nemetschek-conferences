"use server";

import { db, lucia } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z
	.object({
		username: z
			.string({
				invalid_type_error: "Invalid username",
			})
			.regex(/^[a-z0-9_-]+$/, "Invalid username"),
		password: z.string({ invalid_type_error: "Invalid password" }),
	})
	.refine(async ({ username, password }) => {
		const userExists = db
			.select()
			.from(userTable)
			.where(eq(userTable.username, username))
			.get();

		if (userExists === undefined) return false;

		const isValidPassword = await verify(
			userExists.password_hash,
			password,
			{
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1,
			},
		);

		return isValidPassword;
	}, "Incorrect username or password");

export type State = {
	errors?: {
		username?: string[];
		password?: string[];
	};
	message?: string[] | null;
};

export async function login(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const validatedFields = await FormSchema.safeParseAsync({
		username: formData.get("username"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		const { fieldErrors, formErrors } = validatedFields.error.flatten();

		return {
			errors: fieldErrors,
			message: formErrors,
		};
	}

	const { username } = validatedFields.data;
	const existingUser = await db
		.selectDistinct()
		.from(userTable)
		.where(eq(userTable.username, username));

	const session = await lucia.createSession(existingUser[0].id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	const { name, value, attributes } = sessionCookie;
	cookies().set(name, value, attributes);

	redirect("/dashboard");
}
