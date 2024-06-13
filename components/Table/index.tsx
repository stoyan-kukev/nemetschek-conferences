"use client";

import { Dispatch, SetStateAction, useState } from "react";
import TableHead from "./TableHead";
import Dropdown from "@/components/Dropdown";
import { Event } from "@/actions/fetchEvents";

export enum Order {
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

export default function Table({ data }: { data: Event[] }) {
	const [orders, setOrders] = useState({
		name: Order.Default,
		city: Order.Default,
		startDate: Order.Default,
		type: Order.Default,
	});

	const [tableData, setTableData] = useState(data);
	const [dateStart, setDateStart] = useState("");
	const [dateEnd, setDateEnd] = useState("");

	const [searchKeyword, setSearchKeyword] = useState("");

	const filterData = () => {};

	const handleDateChange = () => {
		if (dateStart != "" && dateEnd != "") {
			setTableData(
				tableData.filter(
					({ startDate }) =>
						startDate >= dateStart && startDate <= dateEnd,
				),
			);
		}
	};

	const handleSort = (category: string) => {
		let sortedData = OrderByCategory(
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

		handleDateChange();

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

		handleDateChange();

		setTableData([...preference, ...nonPreference]);
	};

	return (
		<div className="flex min-h-screen justify-center bg-slate-900 text-white">
			<div className="my-auto flex min-h-[75vh] flex-col justify-start md:min-w-[80%]">
				<div className="grid grid-rows-2">
					<div className="flex items-center justify-center">
						<input
							type="text"
							placeholder="Search..."
							value={searchKeyword}
							onChange={handleSearch}
							className="w-3/4 rounded-lg bg-slate-800 text-white sm:p-2"
						/>
						<a href="/dashboard/events/create">
							<button className="m-3 rounded-lg bg-blue-500 sm:p-3">
								Add new event
							</button>
						</a>
					</div>
					<div className="mt-2 flex justify-around">
						<span>
							От:{" "}
							<input
								className="rounded-lg bg-slate-800 text-white"
								type="date"
								onChange={(e) => setDateStart(e.target.value)}
							/>
						</span>
						<span>
							До:{" "}
							<input
								className="rounded-lg bg-slate-800 text-white"
								type="date"
								onChange={(e) => setDateEnd(e.target.value)}
							/>
						</span>
					</div>
				</div>
				<div className="">
					<table className="min-h-[50%] min-w-full table-fixed border-collapse border-inherit indent-0">
						<TableHead orders={orders} handleSort={handleSort} />
						<tbody>
							{tableData.map(
								({
									id,
									name,
									city,
									startDate,
									type,
									organisers,
								}) => (
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
												<p className="font-light text-white/50">
													{type}
												</p>
											</span>
										</td>
										<td className="hidden p-3 md:table-cell">
											{city}
										</td>
										<td className="hidden p-3 md:table-cell">
											{startDate}
										</td>
										<td className="hidden p-3 md:table-cell">
											{type}
										</td>
										<td>
											<Dropdown organisers={organisers}>
												Организатори
											</Dropdown>
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
	data: Event[],
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
