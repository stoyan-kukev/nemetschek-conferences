"use client";

import { State, changePassword } from "@/actions/changePassword";
import InputFields from "@/components/InputFields";
import { useFormState } from "react-dom";

const passwordItems = [
	{
		col: "col-span-full",
		labelName: "Current password",
		displayName: "Текуща парола",
	},
	{
		col: "col-span-full",
		labelName: "New password",
		displayName: "Нова парола",
	},
	{
		col: "col-span-full",
		labelName: "Confirm password",
		displayName: "Потвърдете нова парола",
	},
];

export default function ChangePasswordFields() {
	const initialState: State = { message: null, errors: {} };
	const [state, dispatch] = useFormState(changePassword, initialState);

	return (
		<>
			<div>
				<h2 className="font-semibold leading-7">Промени парола</h2>
				<p className="mt-1 text-sm leading-6 text-gray-500">
					Обновете паролата, която се асоциира с вашия акаунт
				</p>
			</div>
			<form
				className="col-span-2 mb-10 md:max-w-[36rem]"
				action={dispatch}
			>
				<div className="grid gap-x-6 gap-y-8 md:grid-cols-6">
					<InputFields
						items={passwordItems}
						state={state}
						darkMode={true}
					/>
				</div>
				<div className="mt-8 flex flex-col justify-end">
					<button className="rounded-md bg-blue-500 px-4 py-2">
						Запази
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
