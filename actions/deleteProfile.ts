"use server";

import { db, lucia, validateRequest } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export type State = {
	errors?: {
		profile?: string[];
	};
	message?: string[] | null;
};

export async function deleteProfile(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const { user, session } = await validateRequest();
	if (!user)
		return {
			errors: { profile: ["Не сте автентицирани"] },
		};

	await lucia.invalidateUserSessions(user.id);
	await lucia.invalidateSession(session.id);
	await db.delete(userTable).where(eq(userTable.id, user.id));

	return {
		message: ["Потребителият беше изтрит успешно"],
	};
}
