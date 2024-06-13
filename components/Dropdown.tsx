import { User } from "@/actions/fetchUsers";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Dropdown({
	children,
	organisers,
}: {
	children: string;
	organisers: User[];
}) {
	return (
		<Menu>
			<MenuButton className="rounded-xl bg-indigo-700 p-1 text-sm">
				{children}
			</MenuButton>
			<MenuItems anchor="bottom end">
				<div className="block rounded-lg bg-slate-800 p-3 text-white">
					{organisers.map(({ id, firstName, lastName, username }) => (
						<MenuItem key={id}>
							<div className="mb-1 border-b">
								{firstName ? (
									<div>
										{firstName} {lastName}{" "}
										<span>({username})</span>
									</div>
								) : (
									<span>{username}</span>
								)}
							</div>
						</MenuItem>
					))}
				</div>
			</MenuItems>
		</Menu>
	);
}
