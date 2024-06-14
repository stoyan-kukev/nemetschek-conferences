"use server";

import { db, lucia } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
		.min(2, "Фамилията ви е твърде кратка"),
	username: z
		.string({
			invalid_type_error: "Невалидно потребителско име",
		})
		.min(3, "Потребителското име е твърде кратко")
		.max(31, "Потребителското име е твърде дълго")
		.regex(/^[a-z0-9_-]+$/, "Невалидно потребителско име")
		.refine(
			(username) =>
				!db
					.select()
					.from(userTable)
					.where(eq(userTable.username, username))
					.get(),
			"Потребителското име е вече взето",
		),
	password: z
		.string({ invalid_type_error: "Невалидна парола" })
		.min(6, "Паролата е твърде кратка")
		.max(255, "Паролата е твърде дълга"),
});

export type State = {
	errors?: {
		first_name?: string[];
		last_name?: string[];
		username?: string[];
		password?: string[];
	};
	message?: string | null;
};

export async function signup(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const validatedFields = await FormSchema.safeParseAsync({
		username: formData.get("username"),
		password: formData.get("password"),
		first_name: formData.get("first_name"),
		last_name: formData.get("last_name"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { password, username, first_name, last_name } = validatedFields.data;

	const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	const userId = generateIdFromEntropySize(10);

	await db.insert(userTable).values({
		id: userId,
		password_hash: passwordHash,
		username,
		firstName: first_name,
		lastName: last_name,
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	const { name, value, attributes } = sessionCookie;
	cookies().set(name, value, attributes);

	redirect("/dashboard/events");
}
