import { db, lucia } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(formData: FormData): Promise<ActionResult> {
	"use server";

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

	if (
		db
			.select()
			.from(userTable)
			.where(eq(userTable.username, username))
			.get()
	) {
		return {
			error: "Username taken",
		};
	}

	const password = formData.get("password");
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return {
			error: "Invalid password",
		};
	}

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

	return redirect("/");
}
