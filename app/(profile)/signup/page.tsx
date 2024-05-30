import { signup } from "./action";

export default async function Page() {
	return (
		<>
			<h1>Create an account</h1>
			<form action={signup} className="">
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
