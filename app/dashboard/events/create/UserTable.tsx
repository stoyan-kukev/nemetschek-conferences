"use client";

import createEvent, { State } from "@/actions/createEvent";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Page({ children }: { children: JSX.Element[] }) {
	const initialState: State = { message: null, errors: {} };
	const [state, dispatch] = useFormState(createEvent, initialState);

	return (
		<>
			<div className="flex min-h-screen items-center justify-center bg-slate-900">
				<div className="grid min-w-[40%] grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 text-white md:grid-cols-2 md:px-6">
					<div className="col-span-full text-center">
						<h2 className="text-xl font-semibold leading-7">
							Създай събитие
						</h2>
						<p className="text-md mt-1 leading-6 text-gray-500">
							Организирайте следващото голямо събрание!
						</p>
					</div>
					<form className="col-span-full mb-10" action={dispatch}>
						<div className="grid grid-cols-1 gap-y-8 md:grid-cols-6 md:gap-x-6">
							<div className="col-span-4">
								<label
									className="block text-sm font-medium leading-6"
									htmlFor="name"
								>
									Име на събитието
								</label>
								<div className="mt-2">
									<input
										type="text"
										id="name"
										name="name"
										className="w-full rounded-md bg-white/5 text-white shadow-sm ring-2 ring-inset ring-gray-800/10"
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
									className="block text-sm font-medium leading-6"
									htmlFor="city"
								>
									Град
								</label>
								<div className="mt-2">
									<input
										type="text"
										id="city"
										name="city"
										className="w-full rounded-md bg-white/5 text-white shadow-sm ring-2 ring-inset ring-gray-800/10"
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
									className="block text-sm font-medium leading-6"
									htmlFor="date"
								>
									Дата на провеждане
								</label>
								<div className="mt-2">
									<input
										type="date"
										id="date"
										name="date"
										className="w-full rounded-md bg-white/5 text-white shadow-sm ring-2 ring-inset ring-gray-800/10"
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
									className="block text-sm font-medium leading-6"
									htmlFor="type"
								>
									Вид на събитието
								</label>
								<div className="mt-2">
									<select
										name="type"
										id="type"
										className="w-full rounded-md bg-slate-800 text-white shadow-sm ring-2 ring-inset ring-gray-800/10"
									>
										<option value="конференция">
											Конференция
										</option>
										<option value="уъркшоп">Уъркшоп</option>
										<option value="обучение">
											Обучение
										</option>
										<option value="хакатон">Хакатон</option>
										<option value="събрание">
											Събрание
										</option>
										<option value="семинар">Семинар</option>
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
							<div className="col-span-full shadow-sm">
								<label
									className="block text-sm font-medium leading-6"
									htmlFor="date"
								>
									Организатори / Лектори
								</label>

								<ul className="flex flex-col">{children}</ul>
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
						<div className="mt-8 flex justify-between">
							<Link href="/dashboard/events">
								<p className="rounded-md bg-red-500 px-4 py-2">
									Изход
								</p>
							</Link>

							<button
								type="submit"
								className="rounded-md bg-blue-500 px-4 py-2"
							>
								Създай
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
