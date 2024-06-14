import fetchUsers from "@/actions/fetchUsers";

export default async function Page() {
	const users = await fetchUsers();

	return (
		<div className="min-h-screen bg-slate-900 py-10 text-center text-white">
			<h1 className="text-xl font-extrabold">Потребители</h1>
			<div className="m-4 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{users.map(({ id, firstName, username, lastName }) => (
					<Card
						key={id}
						username={username}
						firstName={firstName}
						lastName={lastName}
					/>
				))}
			</div>
		</div>
	);
}

const Card = ({
	username,
	firstName,
	lastName,
}: {
	username: string;
	firstName: string;
	lastName: string;
}) => (
	<div className="flex max-h-[150px] flex-col justify-center rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-lg">
		<div className="text-lg font-semibold">{username}</div>
		<div className="text-sm text-gray-400">
			{firstName} {lastName}
		</div>
	</div>
);
