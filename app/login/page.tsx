import { db, lucia } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
	return (
		<>
			<h1>Log in</h1>
			<form action={signin}>
				<label htmlFor="username">Username</label>
				<input className="text-black" name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input
					className="text-black"
					name="password"
					id="password"
					type="password"
				/>
				<br />
				<button type="submit">Continue</button>
			</form>
		</>
	);
}

async function signin(formData: FormData): Promise<ActionResult> {
	"use server";

	const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username",
		};
	}

	const password = formData.get("password");
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return {
			error: "Invalid password",
		};
	}

	const existingUser = db
		.select()
		.from(userTable)
		.where(eq(userTable.username, username))
		.get();

	if (!existingUser) {
		return {
			error: "Incorrect username or password",
		};
	}

	const validPassword = await verify(existingUser.password_hash, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	if (!validPassword) {
		return {
			error: "Incorrect username or password",
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	const { name, value, attributes } = sessionCookie;
	cookies().set(name, value, attributes);

	return redirect("/");
}