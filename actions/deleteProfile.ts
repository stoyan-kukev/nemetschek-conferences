"use server";

import { db, lucia, validateRequest } from "@/lib/db";
import { sessionTable, userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
			errors: { profile: ["Not authenticated"] },
		};

	await lucia.invalidateUserSessions(user.id);
	await lucia.invalidateSession(session.id);
	await db.delete(userTable).where(eq(userTable.id, user.id));
	revalidatePath("/dashboard");

	return {
		message: ["User deleted successfully"],
	};
}
