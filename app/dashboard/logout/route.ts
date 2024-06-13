import { logout } from "@/actions/logout";
import { validateRequest } from "@/lib/db";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
	const { session } = await validateRequest();

	if (!session) {
		redirect("/");
	}

	await logout();
}
