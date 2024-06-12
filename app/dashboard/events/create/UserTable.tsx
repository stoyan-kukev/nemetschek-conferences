"use client";

import createEvent, { State } from "@/actions/createEvent";
import Test from "@/components/Test";
import { useFormState } from "react-dom";
import UserTable from "./UserTable";

const createEventItems = [
	{ col: "col-span-4", labelName: "Име на събитието", value: "" },
	{ col: "col-span-2", labelName: "Град", value: "" },
	{ col: "col-span-3", labelName: "Дата", value: "" },
	{ col: "col-span-3", labelName: "Тип", value: "" },
];

export default function Page({ children }: { children: JSX.Element[] }) {
	const initialState: State = { message: null, errors: {} };
	const [state, dispatch] = useFormState(createEvent, initialState);

	return (
		<>
			<div className="bg-slate-900 flex justify-center items-center min-h-screen">
				<div className=" text-white grid min-w-[40%] grid-cols-1 py-16 px-4 gap-y-10 gap-x-8 md:grid-cols-2 md:px-6">
					<div className="col-span-full text-center">
						<h2 className="leading-7 text-xl font-semibold">
							Създай събитие
						</h2>
						<p className="leading-6 text-md mt-1 text-gray-500">
							Организирайте следващото голямо събрание!
						</p>
					</div>
					<form className="col-span-full mb-10 " action={dispatch}>
						<div className="md:grid-cols-6 grid-cols-1 gap-y-8 md:gap-x-6 grid">
							<div className="col-span-4">
								<label
									className="block text-sm leading-6 font-medium"
									htmlFor="name"
								>
									Име на събитието
								</label>
								<div className="mt-2">
									<input
										type="text"
										id="name"
										name="name"
										className="ring-gray-800/10 ring-inset ring-2 
								shadow-sm text-white bg-white/5 rounded-md w-full"
									/>
									{state.errors &&
										state.errors.name &&
										state.errors.name.map(
											(error: string) => (
												<p
													className="mt-2 text-sm text-red-500"
													key={error}
												>
													{error}
												</p>
											),
										)}
								</div>
							</div>
							<div className="col-span-2">
								<label
									className="block text-sm leading-6 font-medium"
									htmlFor="city"
								>
									Град
								</label>
								<div className="mt-2">
									<input
										type="text"
										id="city"
										name="city"
										className="ring-gray-800/10 ring-inset ring-2 
								shadow-sm text-white bg-white/5 rounded-md w-full"
									/>
									{state.errors &&
										state.errors.city &&
										state.errors.city.map(
											(error: string) => (
												<p
													className="mt-2 text-sm text-red-500"
													key={error}
												>
													{error}
												</p>
											),
										)}
								</div>
							</div>
							<div className="col-span-3">
								<label
									className="block text-sm leading-6 font-medium"
									htmlFor="date"
								>
									Дата на провеждане
								</label>
								<div className="mt-2">
									<input
										type="date"
										id="date"
										name="date"
										className="ring-gray-800/10 ring-inset ring-2 
								shadow-sm text-white bg-white/5 rounded-md w-full"
									/>
									{state.errors &&
										state.errors.date &&
										state.errors.date.map(
											(error: string) => (
												<p
													className="mt-2 text-sm text-red-500"
													key={error}
												>
													{error}
												</p>
											),
										)}
								</div>
							</div>
							<div className="col-span-3">
								<label
									className="block text-sm leading-6 font-medium"
									htmlFor="type"
								>
									Вид на събитието
								</label>
								<div className="mt-2">
									<select
										name="type"
										id="type"
										className="ring-gray-800/10 ring-inset ring-2 
								shadow-sm text-white bg-slate-800 rounded-md w-full"
									>
										<option value="conference">
											Конференция
										</option>
										<option value="workshop">
											Уъркшоп
										</option>
										<option value="training">
											Обучение
										</option>
										<option value="hackathon">
											Хакатон
										</option>
										<option value="meetup">Събрание</option>
										<option value="lecture">Семинар</option>
									</select>
									{state.errors &&
										state.errors.type &&
										state.errors.type.map(
											(error: string) => (
												<p
													className="mt-2 text-sm text-red-500"
													key={error}
												>
													{error}
												</p>
											),
										)}
								</div>
							</div>
							<div
								className="col-span-full  
								shadow-sm"
							>
								<label
									className="block text-sm leading-6 font-medium"
									htmlFor="date"
								>
									Организатори / Лектори
								</label>

								<ul className=" flex flex-col">{children}</ul>
								{state.errors &&
									state.errors.organisers &&
									state.errors.organisers.map(
										(error: string) => (
											<p
												className="mt-2 text-sm text-red-500"
												key={error}
											>
												{error}
											</p>
										),
									)}
							</div>
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
				</div>
			</div>
		</>
	);
}
