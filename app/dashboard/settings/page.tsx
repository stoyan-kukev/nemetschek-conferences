import { changePassword } from "@/actions/changePassword";
import { editUserProfile } from "@/actions/editUserProfile";
import { logOutOtherSessions } from "@/actions/logOutOtherSessions";
import { validateRequest } from "@/lib/db";

const profileItems = [
	{ col: "col-span-3", labelName: "First name", value: "" },
	{ col: "col-span-3", labelName: "Last name", value: "" },
	{ col: "col-span-full", labelName: "Username", value: "" },
	{ col: "col-span-full", labelName: "Email", value: "" },
];

const passwordItems = [
	{ col: "col-span-full", labelName: "Current password" },
	{ col: "col-span-full", labelName: "New password" },
	{ col: "col-span-full", labelName: "Confirm password" },
];

const logOutSessionsItems = [
	{ col: "col-span-full", labelName: "Your password" },
];

export default async function Page() {
	const { user } = await validateRequest();

	if (user) {
		profileItems[0].value = user.firstName!;
		profileItems[1].value = user.lastName!;
		profileItems[2].value = user.username!;
		profileItems[3].value = user.email!;
	}

	return (
		<>
			<div className="bg-slate-900 flex justify-center">
				<div className=" text-white grid max-w-[80rem] grid-cols-1 py-16 px-4 gap-y-10 gap-x-8 md:grid-cols-3 md:px-6">
					<div>
						<h2 className="leading-7 font-semibold">
							Personal Information
						</h2>
						<p className="leading-6 text-sm mt-1 text-gray-500">
							Change your personal information
						</p>
					</div>
					<form
						className="col-span-2 mb-10 md:max-w-[36rem]"
						action={editUserProfile}
					>
						<div className="md:grid-cols-6 gap-y-8 gap-x-6 grid">
							<InputFields items={profileItems} />
						</div>
						<div className="flex justify-end mt-8">
							<button
								type="submit"
								className="bg-blue-500 px-4 py-2 rounded-md"
							>
								Save
							</button>
						</div>
					</form>
					<div>
						<h2 className="leading-7 font-semibold">
							Change password
						</h2>
						<p className="leading-6 text-sm mt-1 text-gray-500">
							Update your password associated with your account
						</p>
					</div>
					<form
						className="col-span-2 mb-10 md:max-w-[36rem]"
						action={changePassword}
					>
						<div className="md:grid-cols-6 gap-y-8 gap-x-6 grid">
							<InputFields items={passwordItems} />
						</div>
						<div className="flex justify-end mt-8">
							<button className="bg-blue-500 px-4 py-2 rounded-md">
								Save
							</button>
						</div>
					</form>
					<div>
						<h2 className="leading-7 font-semibold">
							Log out of other sessions
						</h2>
						<p className="leading-6 text-sm mt-1 text-gray-500">
							Please enter your password to confirm you would like
							to log out of your other sessions across all of your
							devices.
						</p>
					</div>
					<form
						className="col-span-2 mb-10 md:max-w-[36rem]"
						action={logOutOtherSessions}
					>
						<div className="md:grid-cols-6 gap-y-8 gap-x-6 grid">
							<InputFields items={logOutSessionsItems} />
						</div>
						<div className="flex justify-end mt-8">
							<button className="bg-purple-500 px-4 py-2 rounded-md">
								Log out other sessions
							</button>
						</div>
					</form>
					<div>
						<h2 className="leading-7 font-semibold">
							Delete your account
						</h2>
						<p className="leading-6 text-sm mt-1 text-gray-500">
							No longer want to use our service? You can delete
							your account here. This action is not reversible.
							All information related to this account will be
							deleted permanently.
						</p>
					</div>
					<form className="col-span-2 mb-10">
						<div className="flex mt-8">
							<button className="bg-red-500 px-4 py-2 rounded-md">
								Yes, delete my account
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

function InputFields({
	items,
}: {
	items: { col: string; labelName: string; value?: string }[];
}) {
	return items.map((item) => {
		const htmlName = item.labelName.toLowerCase().replaceAll(" ", "-");

		return (
			<>
				<div className={item.col}>
					<label
						className="block text-sm leading-6 font-medium"
						htmlFor={htmlName}
					>
						{item.labelName}
					</label>
					<div className="mt-2">
						<input
							type={
								htmlName.includes("password")
									? "password"
									: "text"
							}
							id={htmlName}
							name={htmlName}
							className="ring-gray-800/10 ring-inset ring-2 
							shadow-sm text-white bg-white/5 rounded-md w-full"
							defaultValue={item.value}
						/>
					</div>
				</div>
			</>
		);
	});
}
