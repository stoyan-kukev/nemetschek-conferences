import { validateRequest } from "@/lib/db";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

export default async function Navbar() {
	const { session } = await validateRequest();

	if (session) {
		return <LoggedInNav />;
	} else {
		return <LoggedOutNav />;
	}
}
