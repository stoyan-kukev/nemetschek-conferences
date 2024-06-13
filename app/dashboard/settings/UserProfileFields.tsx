"use client";

import { State, editUserProfile } from "@/actions/editUserProfile";
import InputFields from "@/components/InputFields";
import { useFormState } from "react-dom";

const profileItems = [
	{ col: "col-span-full", labelName: "Username", value: "" },
	{ col: "col-span-full md:col-span-3", labelName: "First name", value: "" },
	{ col: "col-span-full md:col-span-3", labelName: "Last name", value: "" },
];

export default function UserProfileFields() {
	const initialState: State = { message: null, errors: {} };
	const [state, dispatch] = useFormState(editUserProfile, initialState);

	return (
		<>
			<div>
				<h2 className="font-semibold leading-7">
					Personal Information
				</h2>
				<p className="mt-1 text-sm leading-6 text-gray-500">
					Change your personal information
				</p>
			</div>
			<form
				className="col-span-2 mb-10 md:max-w-[36rem]"
				action={dispatch}
			>
				<div className="grid gap-x-6 gap-y-8 md:grid-cols-6">
					<InputFields
						items={profileItems}
						state={state}
						darkMode={true}
					/>
				</div>
				<div className="mt-8 flex flex-col justify-end">
					<button
						type="submit"
						className="rounded-md bg-blue-500 px-4 py-2"
					>
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
