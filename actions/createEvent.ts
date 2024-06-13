"use server";

import { db, validateRequest } from "@/lib/db";
import { eventTable, userEventTable } from "@/lib/db/schema";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
	name: z
		.string({ invalid_type_error: "Невалидно име" })
		.min(3, "Името е твърде кратко")
		.max(255, "Името е твърде дълго"),
	city: z
		.string({ invalid_type_error: "Невалидно име на град" })
		.min(3, "Името на града е твърде кратко")
		.max(255, "Името на града е твърде дълго"),
	date: z
		.string({ invalid_type_error: "Невалидна дата" })
		.date("Липсваща дата"),
	type: z.enum(
		[
			"конференция",
			"уъркшоп",
			"обучение",
			"хакатон",
			"събрание",
			"семинар",
		],
		{ invalid_type_error: "Невалиден вид на събитие" },
	),
	organisers: z
		.array(z.string(), { invalid_type_error: "Невалидни организатори" })
		.nonempty("Трябва да изберете поне един организатор/лектор"),
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
