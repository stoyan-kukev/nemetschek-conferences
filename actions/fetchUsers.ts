import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema";

export type User = {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
};

export default async function fetchUsers(): Promise<User[]> {
	return await db
		.select({
			id: userTable.id,
			username: userTable.username,
			firstName: userTable.firstName,
			lastName: userTable.lastName,
		})
		.from(userTable);
}
