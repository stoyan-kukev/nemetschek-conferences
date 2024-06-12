"use server";

import { db, validateRequest } from "@/lib/db";
import { eventTable, userEventTable } from "@/lib/db/schema";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
	name: z
		.string({ invalid_type_error: "Invalid name" })
		.min(3, "Name too short")
		.max(255, "Name too long"),
	city: z
		.string({ invalid_type_error: "Invalid city name" })
		.min(3, "City name too short")
		.max(255, "City name too long"),
	date: z.string({ invalid_type_error: "Invalid date" }).date("Missing date"),
	type: z.enum(
		[
			"conference",
			"workshop",
			"training",
			"hackathon",
			"meetup",
			"lecture",
		],
		{ invalid_type_error: "Invalid type of conference" },
	),
	organisers: z
		.array(z.string(), { invalid_type_error: "Invalid organisers" })
		.nonempty("You need to select at least one organiser"),
});

export type State = {
	errors?: {
		name?: string[];
		city?: string[];
		date?: string[];
		type?: string[];
		organisers?: string[];
	};
	message?: string[] | null;
};

export default async function createEvent(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const { session } = await validateRequest();
	if (!session) return {};

	const validatedFields = await FormSchema.safeParseAsync({
		name: formData.get("name"),
		city: formData.get("city"),
		date: formData.get("date"),
		type: formData.get("type"),
		organisers: formData.getAll("organiser"),
	});

	if (!validatedFields.success) {
		const { fieldErrors, formErrors } = validatedFields.error.flatten();

		return {
			errors: fieldErrors,
			message: formErrors,
		};
	}
	const { name, city, date, type, organisers } = validatedFields.data;

	const eventId = generateIdFromEntropySize(20);

	await db.insert(eventTable).values({
		id: eventId,
		name,
		city,
		startDate: date,
		type,
	});

	for (const organiser of organisers) {
		await db.insert(userEventTable).values({
			id: generateIdFromEntropySize(20),
			eventId,
			userId: organiser,
		});
	}

	redirect("/dashboard/events");
}
