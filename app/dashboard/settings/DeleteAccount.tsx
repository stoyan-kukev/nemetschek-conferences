"use client";

import { deleteProfile, State } from "@/actions/deleteProfile";
import { useFormState } from "react-dom";

export default function DeleteFunction() {
	const initialState: State = { message: null, errors: {} };
	const [state, dispatch] = useFormState(deleteProfile, initialState);

	return (
		<>
			<div>
				<h2 className="font-semibold leading-7">Delete your account</h2>
				<p className="mt-1 text-sm leading-6 text-gray-500">
					No longer want to use our service? You can delete your
					account here. This action is not reversible. All information
					related to this account will be deleted permanently.
				</p>
			</div>
			<form
				className="col-span-2 mb-10 md:max-w-[36rem]"
				action={dispatch}
			>
				<div className="mt-8 flex flex-col">
					<button className="rounded-md bg-red-500 px-4 py-2">
						Yes, delete my account
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
