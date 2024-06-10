"use server";

import { db, lucia } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
	username: z
		.string({
			invalid_type_error: "Invalid username",
		})
		.min(3, "Username too short")
		.max(31, "Username too long")
		.regex(/^[a-z0-9_-]+$/, "Invalid username")
		.refine(
			(username) =>
				!db
					.select()
					.from(userTable)
					.where(eq(userTable.username, username))
					.get(),
			"Username taken",
		),
	password: z
		.string({ invalid_type_error: "Invalid password" })
		.min(6, "Password too short")
		.max(255, "Password too long"),
});

export type State = {
	errors?: {
		username?: string[];
		password?: string[];
	};
	message?: string | null;
};

export async function signup(prevState: State, formData: FormData) {
	const validatedFields = await FormSchema.safeParseAsync({
		username: formData.get("username"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing fields. Failed to create an invoice.",
		};
	}

	const { password, username } = validatedFields.data;

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
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	const { name, value, attributes } = sessionCookie;
	cookies().set(name, value, attributes);

	redirect("/test/232");
}
