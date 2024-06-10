import { login } from "@/actions/login";
import { db, validateRequest } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { like, or } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
	const { session } = await validateRequest();
	if (!session) {
		return;
	}

	const formData = await request.formData();

	const searchedName = formData.get("search");
	if (typeof searchedName !== "string") {
		return;
	}

	const users = await db
		.select({
			username: userTable.username,
			firstName: userTable.firstName,
			lastName: userTable.lastName,
		})
		.from(userTable)
		.where(
			or(
				like(userTable.username, searchedName),
				like(userTable.firstName, searchedName),
				like(userTable.lastName, searchedName),
			),
		);

	return users;
}
