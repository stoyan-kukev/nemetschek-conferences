"use client";

import { State, changePassword } from "@/actions/changePassword";
import InputFields from "@/components/InputFields";
import { useFormState } from "react-dom";

const passwordItems = [
	{ col: "col-span-full", labelName: "Current password" },
	{ col: "col-span-full", labelName: "New password" },
	{ col: "col-span-full", labelName: "Confirm password" },
];

export default function ChangePasswordFields() {
	const initialState: State = { message: null, errors: {} };
	const [state, dispatch] = useFormState(changePassword, initialState);

	return (
		<>
			<div>
				<h2 className="leading-7 font-semibold">Change password</h2>
				<p className="leading-6 text-sm mt-1 text-gray-500">
					Update your password associated with your account
				</p>
			</div>
			<form
				className="col-span-2 mb-10 md:max-w-[36rem]"
				action={dispatch}
			>
				<div className="md:grid-cols-6 gap-y-8 gap-x-6 grid">
					<InputFields items={passwordItems} state={state} />
				</div>
				<div className="flex justify-end flex-col mt-8">
					<button className="bg-blue-500 px-4 py-2 rounded-md">
						Save
					</button>
					{state.message && (
						<p className="mt-2 text-sm text-green-500">
							{state.message}
						</p>
					)}
				</div>
			</form>
		</>
	);
}
