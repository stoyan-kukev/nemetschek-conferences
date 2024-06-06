import { validateRequest } from "@/lib/db";
import LoggedOutNav from "./LoggedOutNav";
import SideNav from "../SideNav";

export default async function Navbar() {
	const { session } = await validateRequest();

	if (session) {
		return <SideNav />;
	} else {
		return <LoggedOutNav />;
	}
}
