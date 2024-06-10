"use client";

import { State, logOutOtherSessions } from "@/actions/logOutOtherSessions";
import InputFields from "@/components/InputFields";
import { useFormState } from "react-dom";

const logOutSessionsItems = [
	{ col: "col-span-full", labelName: "Current password" },
];

export default function LogOutSessions() {
	const initialState: State = { message: null, errors: {} };
	const [state, dispatch] = useFormState(logOutOtherSessions, initialState);

	return (
		<>
			<div>
				<h2 className="leading-7 font-semibold">
					Log out of other sessions
				</h2>
				<p className="leading-6 text-sm mt-1 text-gray-500">
					Please enter your password to confirm you would like to log
					out of your other sessions across all of your devices.
				</p>
			</div>
			<form
				className="col-span-2 mb-10 md:max-w-[36rem]"
				action={dispatch}
			>
				<div className="md:grid-cols-6 gap-y-8 gap-x-6 grid">
					<InputFields items={logOutSessionsItems} state={state} />
				</div>
				<div className="flex justify-end flex-col mt-8">
					<button className="bg-purple-500 px-4 py-2 rounded-md">
						Log out other sessions
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