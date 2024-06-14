import {
	AdjustmentsHorizontalIcon,
	DevicePhoneMobileIcon,
	StarIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const features = [
	{
		name: "Потребителски профили",
		description:
			"Напълно завършени и персонализирани поребителски профили.",
		icon: UserIcon,
	},
	{
		name: "Настройки за всеки потребител",
		description:
			"Персонализирана страница за всеки профил, където могат да се променят линчни данни и пароли.",
		icon: AdjustmentsHorizontalIcon,
	},
	{
		name: "Изпълнено зададено условие",
		description:
			"Собственоръчно направена таблица с възможност за сортиране по всеки критерии и търсачка за дати, градове и събития.",
		icon: StarIcon,
	},
	{
		name: "Направено и за телефон",
		description:
			"Целият дизайн е адаптивен и работи на почти всеки размер на екрана.",
		icon: DevicePhoneMobileIcon,
	},
];

export default function Home() {
	return (
		<div className="container grid grid-cols-4 p-5 sm:p-10">
			<div className="col-span-4 flex flex-col">
				<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Nemetschek Conferences
				</p>
				<div className="my-3 flex justify-between">
					<Link href="/dashboard/signup">
						<button className="rounded-md bg-indigo-700 px-4 py-3 text-white">
							Регистрирай се
						</button>
					</Link>
					<Link href="/dashboard/login">
						<button className="rounded-md bg-blue-700 px-4 py-3 text-white">
							Влез
						</button>
					</Link>
				</div>
			</div>
			<div className="col-span-4 mt-10">
				<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
					{features.map((feature) => (
						<div key={feature.name} className="relative pl-16">
							<dt className="text-base font-semibold leading-7 text-gray-900">
								<div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
									<feature.icon
										className="h-6 w-6 text-white"
										aria-hidden="true"
									/>
								</div>
								{feature.name}
							</dt>
							<dd className="mt-2 text-base leading-7 text-gray-600">
								{feature.description}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</div>
	);
}
