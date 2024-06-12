import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema";

export default async function fetchUsers(): Promise<
	{
		id: string;
		username: string;
		firstName: string | null;
		lastName: string | null;
	}[]
> {
	return await db
		.select({
			id: userTable.id,
			username: userTable.username,
			firstName: userTable.firstName,
			lastName: userTable.lastName,
		})
		.from(userTable);
}
