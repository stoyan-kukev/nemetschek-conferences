import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
	username: text("username").notNull().unique(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	email: text("email"),
	role: text("role").notNull().default("user"),
	password_hash: text("password_hash").notNull(),
});

export const eventTable = sqliteTable("event", {
	id: text("id").notNull().primaryKey(),
	name: text("name").notNull(),
	city: text("city").notNull(),
	startDate: text("start_date").notNull(),
	type: text("type").default("conference"),
});

export const userEventTable = sqliteTable("user_event", {
	id: text("id").notNull().primaryKey(),
	eventId: text("event_id")
		.notNull()
		.references(() => eventTable.id),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	userRole: text("user_role").notNull().default("attendee"),
});

export const sessionTable = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at").notNull(),
});
