"use client";

import createEvent from "@/actions/createEvent";
import Dropdown from "@/components/Dropdown";
import InputFields from "@/components/InputFields";
import Test from "@/components/Test";
import { PlusIcon } from "@heroicons/react/24/outline";

const createEventItems = [
	{ col: "col-span-4", labelName: "Име на събитието", value: "" },
	{ col: "col-span-2", labelName: "Град", value: "" },
	{ col: "col-span-3", labelName: "Дата", value: "" },
	{ col: "col-span-3", labelName: "Тип", value: "" },
];

export default function Page() {
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
					<form className="col-span-full mb-10 " action={createEvent}>
						<div className="md:grid-cols-6 grid-cols-1 gap-y-8 md:gap-x-6 grid">
							<div className="col-span-4">
								<label
									className="block text-sm leading-6 font-medium"
									htmlFor="event-name"
								>
									Име на събитието
								</label>
								<div className="mt-2">
									<input
										type="text"
										id="event-name"
										name="event-name"
										className="ring-gray-800/10 ring-inset ring-2 
								shadow-sm text-white bg-white/5 rounded-md w-full"
									/>
								</div>
							</div>
							<div className="col-span-2">
								<label
									className="block text-sm leading-6 font-medium"
									htmlFor="event-city"
								>
									Град
								</label>
								<div className="mt-2">
									<input
										type="text"
										id="event-city"
										name="event-city"
										className="ring-gray-800/10 ring-inset ring-2 
								shadow-sm text-white bg-white/5 rounded-md w-full"
									/>
								</div>
							</div>
							<div className="col-span-3">
								<label
									className="block text-sm leading-6 font-medium"
									htmlFor="event-date"
								>
									Дата на провеждане
								</label>
								<div className="mt-2">
									<input
										type="date"
										id="event-date"
										name="event-date"
										className="ring-gray-800/10 ring-inset ring-2 
								shadow-sm text-white bg-white/5 rounded-md w-full"
									/>
								</div>
							</div>
							<div className="col-span-3">
								<label
									className="block text-sm leading-6 font-medium"
									htmlFor="event-type"
								>
									Вид на събитието
								</label>
								<div className="mt-2">
									<select
										name="event-type"
										id="event-type"
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
								</div>
							</div>
							<div
								className="col-span-full ring-gray-800/10 ring-inset ring-2 
								shadow-sm"
							>
								<label
									className="block text-sm leading-6 font-medium"
									htmlFor="event-date"
								>
									Организатори / Лектори
								</label>

								<Test />
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
