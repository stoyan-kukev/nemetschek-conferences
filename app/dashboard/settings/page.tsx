import { logOutOtherSessions } from "@/actions/logOutOtherSessions";
import InputFields from "@/components/InputFields";
import UserProfileFields from "./UserProfileFields";
import ChangePasswordFields from "./ChangePasswordFields";
import LogOutSessions from "./LogOutSessions";
import DeleteAccount from "./DeleteAccount";

export default async function Page() {
	return (
		<>
			<div className="bg-slate-900 flex justify-center">
				<div className=" text-white grid max-w-[80rem] grid-cols-1 py-16 px-4 gap-y-10 gap-x-8 md:grid-cols-3 md:px-6">
					<UserProfileFields />
					<ChangePasswordFields />
					<LogOutSessions />
					<DeleteAccount />
				</div>
			</div>
		</>
	);
}
