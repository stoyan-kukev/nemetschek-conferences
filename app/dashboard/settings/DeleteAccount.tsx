"use client";

import { deleteProfile, State } from "@/actions/deleteProfile";
import { useFormState } from "react-dom";

export default function DeleteFunction() {
	const initialState: State = { message: null, errors: {} };
	const [state, dispatch] = useFormState(deleteProfile, initialState);

	return (
		<>
			<div>
				<h2 className="font-semibold leading-7">
					Изтрийте вашият профил
				</h2>
				<p className="mt-1 text-sm leading-6 text-gray-500">
					Тук можете да изтриете акаунта си. Това действие не е
					обратимо. Цялата информация, свързана с този акаунт, ще бъде
					изтрита за постоянно.
				</p>
			</div>
			<form
				className="col-span-2 mb-10 md:max-w-[36rem]"
				action={dispatch}
			>
				<div className="mt-8 flex flex-col">
					<button className="rounded-md bg-red-500 px-4 py-2">
						Да, изтрийте акаунта ми
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
