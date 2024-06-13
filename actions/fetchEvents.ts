import { db } from "@/lib/db";
import { eventTable, userEventTable, userTable } from "@/lib/db/schema";
import { eq, like, or } from "drizzle-orm";
import { User } from "./fetchUsers";

export type Event = {
	id: string;
	name: string;
	city: string;
	startDate: string;
	type: string;
	organisers: User[];
};

type PartialEvent = {
	id: string;
	name: string;
	city: string;
	startDate: string;
	type: string;
};

function getEventKey(event: PartialEvent): string {
	return JSON.stringify(event);
}

function processEvents(
	events: {
		user: {
			id: string;
			username: string;
			firstName: string | null;
			lastName: string | null;
		} | null;
		event: {
			id: string;
			name: string;
			city: string;
			startDate: string;
			type: string;
		} | null;
	}[],
): Event[] {
	const eventMap = new Map<string, User[]>();

	events.forEach(({ user, event }) => {
		if (event == null) {
			return;
		}
		const pEvent = {
			id: event.id,
			name: event.name,
			city: event.city,
			startDate: event.startDate,
			type: event.type,
		};
		if (user == null) return;

		const parsed = getEventKey(pEvent);
		if (eventMap.has(parsed)) {
			eventMap.get(parsed)?.push(user);
		} else {
			eventMap.set(parsed, [user]);
		}
	});

	const eventsArray: Event[] = [];

	eventMap.forEach((organisers, eventKey) => {
		const eventP: PartialEvent = JSON.parse(eventKey);
		const event: Event = {
			id: eventP.id,
			name: eventP.name,
			city: eventP.city,
			startDate: eventP.startDate,
			type: eventP.type,
			organisers: organisers,
		};

		eventsArray.push(event);
	});

	return eventsArray;
}

export async function fetchEvents() {
	const data = await db
		.select({
			user: {
				id: userTable.id,
				username: userTable.username,
				firstName: userTable.firstName,
				lastName: userTable.lastName,
			},
			event: {
				id: eventTable.id,
				name: eventTable.name,
				city: eventTable.city,
				startDate: eventTable.startDate,
				type: eventTable.type,
			},
		})
		.from(eventTable)
		.fullJoin(userEventTable, eq(userEventTable.eventId, eventTable.id))
		.fullJoin(userTable, eq(userEventTable.userId, userTable.id));

	return processEvents(data);
}
