"use client";

import { State, editUserProfile } from "@/actions/editUserProfile";
import InputFields from "@/components/InputFields";
import { useFormState } from "react-dom";

const profileItems = [
	{ col: "col-span-full md:col-span-3", labelName: "First name", value: "" },
	{ col: "col-span-full md:col-span-3", labelName: "Last name", value: "" },
	{ col: "col-span-full", labelName: "Username", value: "" },
	{ col: "col-span-full", labelName: "Email", value: "" },
];

export default function UserProfileFields() {
	const initialState: State = { message: null, errors: {} };
	const [state, dispatch] = useFormState(editUserProfile, initialState);

	return (
		<>
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
				action={dispatch}
			>
				<div className="md:grid-cols-6 gap-y-8 gap-x-6 grid">
					<InputFields items={profileItems} state={state} />
				</div>
				<div className="flex justify-end flex-col mt-8">
					<button
						type="submit"
						className="bg-blue-500 px-4 py-2 rounded-md"
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
