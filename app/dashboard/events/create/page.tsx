import fetchUsers from "@/actions/fetchUsers";
import UserTable from "./UserTable";

export default async function Page() {
	const users = await fetchUsers();
	const components = users.map(({ username, id }) => (
		<>
			<h4>{username}</h4>
			<p>{id}</p>
		</>
	));

	return (
		<>
			<UserTable />
		</>
	);
}
