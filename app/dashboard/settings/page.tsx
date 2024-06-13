import UserProfileFields from "./UserProfileFields";
import ChangePasswordFields from "./ChangePasswordFields";
import LogOutSessions from "./LogOutSessions";
import DeleteAccount from "./DeleteAccount";

export default async function Page() {
	return (
		<>
			<div className="flex min-h-screen justify-center bg-slate-900">
				<div className="grid max-w-[80rem] grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 text-white md:grid-cols-3 md:px-6">
					<UserProfileFields />
					<ChangePasswordFields />
					<LogOutSessions />
					<DeleteAccount />
				</div>
			</div>
		</>
	);
}
