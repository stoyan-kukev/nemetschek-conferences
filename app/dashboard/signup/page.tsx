"use client";

import { State, signup } from "@/actions/signup";
import InputFields from "@/components/InputFields";
import Link from "next/link";
import { useFormState } from "react-dom";

const profileItems = [
	{ col: "col-span-full", labelName: "Username", value: "" },
	{ col: "col-span-full", labelName: "First name", value: "" },
	{ col: "col-span-full", labelName: "Last name", value: "" },
	{ col: "col-span-full", labelName: "Password", value: "" },
];

export default function Page() {
	const initialState: State = { message: null, errors: {} };
	const [state, dispatch] = useFormState(signup, initialState);

	return (
		<>
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Create a new account
					</h2>
				</div>

				<p className="mt-5 text-center text-sm text-gray-500">
					Already have an account?{" "}
					<Link
						href="/dashboard/login"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Log in
					</Link>
				</p>

				<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						className="col-span-2 mb-10 md:max-w-[36rem]"
						action={dispatch}
					>
						<div className="grid gap-x-6 gap-y-8 text-black md:grid-cols-6">
							<InputFields
								items={profileItems}
								state={state}
								darkMode={false}
							/>
						</div>
						<div className="mt-8 flex flex-col justify-end">
							<button
								type="submit"
								className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white"
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
				</div>
			</div>
		</>
	);
}
