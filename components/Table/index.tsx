"use client";

import {
	ChevronDownIcon,
	ChevronUpDownIcon,
	ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";

enum Order {
	Ascending,
	Descending,
	Default,
}

function changeOrder(order: Order): Order {
	switch (order) {
		case Order.Default:
			return Order.Descending;
		case Order.Descending:
			return Order.Ascending;
		case Order.Ascending:
			return Order.Default;
	}
}

export default function Table({
	data,
}: {
	data: {
		id: string;
		name: string;
		city: string;
		startDate: string;
		type: string | null;
	}[];
}) {
	const [orders, setOrders] = useState({
		name: Order.Default,
		city: Order.Default,
		startDate: Order.Default,
		type: Order.Default,
	});

	const [tableData, setTableData] = useState(data);

	const [searchKeyword, setSearchKeyword] = useState("");

	const handleSort = (category: string) => {
		const sortedData = OrderByCategory(
			tableData,
			category,
			// @ts-ignore
			orders[category],
			setOrders,
		);
		const preference = sortedData.filter((item) =>
			item.name.toLowerCase().split(" ").join("").includes("devbites"),
		);
		const nonPreference = sortedData.filter(
			(item) =>
				!item.name
					.toLowerCase()
					.split(" ")
					.join("")
					.includes("devbites"),
		);

		setTableData([...preference, ...nonPreference]);
	};

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const keyword = event.target.value.toLowerCase();
		setSearchKeyword(keyword);
		const filteredData = data.filter((item) =>
			Object.values(item).some((val) =>
				val ? val.toString().toLowerCase().includes(keyword) : false,
			),
		);

		const preference = filteredData.filter((item) =>
			item.name.toLowerCase().split(" ").join("").includes("devbites"),
		);
		const nonPreference = filteredData.filter(
			(item) =>
				!item.name
					.toLowerCase()
					.split(" ")
					.join("")
					.includes("devbites"),
		);

		setTableData([...preference, ...nonPreference]);
	};

	return (
		<div className="flex min-h-screen justify-center bg-slate-900 text-white">
			<div className="my-auto flex min-h-[75vh] flex-col justify-start md:min-w-[80%]">
				<div className="flex items-center justify-between">
					<input
						type="text"
						placeholder="Search..."
						value={searchKeyword}
						onChange={handleSearch}
						className="h-[50%] rounded-lg bg-slate-800 p-2 text-white"
					/>
					<a href="/dashboard/events/create">
						<button className="m-3 rounded-lg bg-blue-500 p-3">
							Add new event
						</button>
					</a>
				</div>
				<div className="">
					<table className="min-h-[50%] min-w-full table-fixed border-collapse border-inherit indent-0">
						<thead className="">
							<tr className="text-left">
								<th
									onClick={() => handleSort("name")}
									className="cursor-pointer select-none p-3 font-semibold leading-6 md:pl-0"
								>
									Name
									{orders.name == Order.Default ? (
										<ChevronUpDownIcon className="inline size-4" />
									) : orders.name == Order.Descending ? (
										<ChevronDownIcon className="inline size-4" />
									) : orders.name == Order.Ascending ? (
										<ChevronUpIcon className="inline size-4" />
									) : (
										<></>
									)}
								</th>
								<th
									onClick={() => handleSort("city")}
									className="hidden cursor-pointer select-none p-3 font-semibold leading-6 md:table-cell md:pl-0"
								>
									City
									{orders.city == Order.Default ? (
										<ChevronUpDownIcon className="inline size-4" />
									) : orders.city == Order.Descending ? (
										<ChevronDownIcon className="inline size-4" />
									) : orders.city == Order.Ascending ? (
										<ChevronUpIcon className="inline size-4" />
									) : (
										<></>
									)}
								</th>
								<th
									onClick={() => handleSort("startDate")}
									className="hidden cursor-pointer select-none p-3 font-semibold leading-6 md:table-cell md:pl-0"
								>
									Start Date
									{orders.startDate == Order.Default ? (
										<ChevronUpDownIcon className="inline size-4" />
									) : orders.startDate == Order.Descending ? (
										<ChevronDownIcon className="inline size-4" />
									) : orders.startDate == Order.Ascending ? (
										<ChevronUpIcon className="inline size-4" />
									) : (
										<></>
									)}
								</th>
								<th
									onClick={() => handleSort("type")}
									className="cursor-pointer select-none p-3 font-semibold leading-6 md:pl-0"
								>
									Type
									{orders.type == Order.Default ? (
										<ChevronUpDownIcon className="inline size-4" />
									) : orders.type == Order.Descending ? (
										<ChevronDownIcon className="inline size-4" />
									) : orders.type == Order.Ascending ? (
										<ChevronUpIcon className="inline size-4" />
									) : (
										<></>
									)}
								</th>
							</tr>
						</thead>
						<tbody>
							{tableData.map(
								({ id, name, city, startDate, type }) => (
									<tr className="border-y" key={id}>
										<td className="p-3">
											{name}
											<span className="block md:hidden">
												<p className="font-normal text-white/70">
													{city}
												</p>
												<p className="font-normal text-white/60">
													{startDate}
												</p>
											</span>
										</td>
										<td className="hidden p-3 md:table-cell">
											{city}
										</td>
										<td className="hidden p-3 md:table-cell">
											{startDate}
										</td>
										<td className="p-3">{type}</td>
										<td>
											<button className="rounded-xl bg-indigo-700 p-1 text-sm">
												Oрганизтори
											</button>
										</td>
									</tr>
								),
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

function OrderByCategory(
	data: {
		id: string;
		name: string;
		city: string;
		startDate: string;
		type: string | null;
	}[],
	category: string,
	currentOrder: Order,
	setOrders: Dispatch<
		SetStateAction<{
			name: Order;
			city: Order;
			startDate: Order;
			type: Order;
		}>
	>,
) {
	const newOrder = changeOrder(currentOrder);

	const sortedData = [...data].sort((a, b) => {
		// @ts-ignore
		let valA = a[category];
		// @ts-ignore
		let valB = b[category];

		if (category === "startDate") {
			valA = Date.parse(valA);
			valB = Date.parse(valB);
		} else {
			valA = valA.toString().toLowerCase();
			valB = valB.toString().toLowerCase();
		}

		if (valA < valB) return newOrder === Order.Ascending ? -1 : 1;
		if (valA > valB) return newOrder === Order.Ascending ? 1 : -1;
		return 0;
	});

	setOrders((prevOrders) => ({
		...prevOrders,
		[category]: newOrder,
	}));

	return sortedData;
}
