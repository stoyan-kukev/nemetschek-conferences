import fetchUsers from "@/actions/fetchUsers";
import UserTable from "./UserTable";

export default async function Page() {
	const users = await fetchUsers();
	const components = users.map(({ username, id, firstName, lastName }) => (
		<li key={id} className="w-full rounded-t-lg dark:border-gray-600">
			<div className="flex items-center ps-3">
				<input
					type="checkbox"
					name="organiser"
					value={id}
					className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
				/>
				<label
					htmlFor={id}
					className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					<span className="mr-2">{`${firstName} ${lastName}`}</span>
					<span className="text-gray-600">{`(${username})`}</span>
				</label>
			</div>
		</li>
	));

	return (
		<>
			<UserTable>{components}</UserTable>
		</>
	);
}
