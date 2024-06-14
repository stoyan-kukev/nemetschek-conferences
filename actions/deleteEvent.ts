"use server";

import { db, validateRequest } from "@/lib/db";
import { eventTable, userEventTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function deleteEvent(
	formData: FormData,
): Promise<ActionResult> {
	const { session } = await validateRequest();
	if (!session) return {};

	const id = formData.get("id");
	if (typeof id !== "string") {
		return {
			error: "Нещо сероизно се обърка!",
		};
	}

	await db.delete(userEventTable).where(eq(userEventTable.eventId, id));
	await db.delete(eventTable).where(eq(eventTable.id, id));

	return {};
}
