import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sessionTable, userTable } from "./schema";
import { Lucia, Session, User } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";

const sqlite = new Database("dev.db");
export const db = drizzle(sqlite);

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: ({ username }) => {
		return {
			username,
		};
	},
});

export const validateRequest = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}

		const result = await lucia.validateSession(sessionId);

		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(
					result.session.id
				);
				const { name, value, attributes } = sessionCookie;
				cookies().set(name, value, attributes);
			}

			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				const { name, value, attributes } = sessionCookie;
				cookies().set(name, value, attributes);
			}
		} catch {}

		return result;
	}
);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}
