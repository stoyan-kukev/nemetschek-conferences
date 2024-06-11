import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema";

export default async function fetchUsers(): Promise<
	{ id: string; username: string }[]
> {
	return await db
		.select({ id: userTable.id, username: userTable.username })
		.from(userTable);
}
