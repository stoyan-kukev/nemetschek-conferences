"use server";

import { db, lucia, validateRequest } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { hash, verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ActionResult = {
	error?: string;
};

export async function changePassword(
	formData: FormData
): Promise<ActionResult> {
	const { user } = await validateRequest();
	if (!user) {
		return {
			error: "server;Unauthorized",
		};
	}

	const currentPassword = formData.get("current-password");
	if (
		typeof currentPassword !== "string" ||
		currentPassword.length < 6 ||
		currentPassword.length > 255
	) {
		return {
			error: "currentPassword;Invalid current password",
		};
	}

	const possibleHash = await db
		.selectDistinct({ userPass: userTable.password_hash })
		.from(userTable)
		.where(eq(userTable.id, user.id));

	const { userPass } = possibleHash[0];

	const validPassword = await verify(userPass, currentPassword, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	if (!validPassword) {
		return {
			error: "currentPassword;Incorrect current password",
		};
	}

	const newPassword = formData.get("new-password");
	if (
		typeof newPassword !== "string" ||
		newPassword.length < 6 ||
		newPassword.length > 255
	) {
		return {
			error: "newPassword;Invalid new password",
		};
	}

	const confPassword = formData.get("confirm-password");
	if (
		typeof confPassword !== "string" ||
		confPassword.length < 6 ||
		confPassword.length > 255
	) {
		return {
			error: "confPassword;Invalid confirm password",
		};
	}

	if (confPassword != newPassword) {
		return {
			error: "confPassword;Passwords don't match",
		};
	}

	const newPasswordHash = await hash(newPassword, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	await db
		.update(userTable)
		.set({ password_hash: newPasswordHash })
		.where(eq(userTable.id, user.id));

	await lucia.invalidateUserSessions(user.id);
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	const { name, value, attributes } = sessionCookie;
	cookies().set(name, value, attributes);

	revalidatePath("/dashboard/settings");

	return {};
}
