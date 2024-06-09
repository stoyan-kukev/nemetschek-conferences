import { login } from "@/actions/login";
import { validateRequest } from "@/lib/db";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
	const { session } = await validateRequest();

	if (session) {
		redirect("/dashboard");
	}

	await login(await request.formData());
}
