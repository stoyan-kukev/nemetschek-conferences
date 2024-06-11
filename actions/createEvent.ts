"use server";

import { db } from "@/lib/db";
import { eventTable } from "@/lib/db/schema";
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
	date: z.date({ invalid_type_error: "Invalid date" }),
	type: z.enum(
		[
			"conference",
			"workshop",
			"training",
			"hackathon",
			"meetup",
			"lecture",
		],
		{ invalid_type_error: "Invalid type of conference" }
	),
	organisers: z.array(z.string(), {
		invalid_type_error: "Invalid organizers",
	}),
});

export type State = {
	errors?: {
		profile?: string[];
	};
	message?: string[] | null;
};

export default async function createEvent(
	prevState: State,
	formData: FormData
): Promise<State> {
	return {};
}
