import { lucia, validateRequest } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LogOut() {
	return (
		<form action={logout}>
			<button>Sign Out</button>
		</form>
	);
}

async function logout(): Promise<ActionResult> {
	"use server";

	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthoraized",
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	const { name, value, attributes } = sessionCookie;
	cookies().set(name, value, attributes);

	return redirect("/");
}
