import { db } from "@/lib/db";
import { eventTable, userEventTable, userTable } from "@/lib/db/schema";
import { eq, like, or } from "drizzle-orm";
import { User } from "./fetchUsers";

export type Event = {
	name: string;
	city: string;
	date: string;
	type: string;
	organisers: User[];
};

export async function fetchEvents() {
	const data = await db.select().from(eventTable);

	return data;
}
