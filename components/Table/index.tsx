"use client";

import {
	Dispatch,
	SetStateAction,
	useEffect,
	useReducer,
	useState,
} from "react";
import TableHead from "./TableHead";
import Dropdown from "@/components/Dropdown";
import { Event } from "@/actions/fetchEvents";
import { XMarkIcon } from "@heroicons/react/24/outline";
import deleteEvent from "@/actions/deleteEvent";
import { useFormState } from "react-dom";
import Link from "next/link";

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

	useEffect(() => {
		filterData();
	}, [dateStart, dateEnd, searchKeyword]);

	const handleDeleteEvent = async (id: string) => {
		try {
			const formData = new FormData();
			formData.append("id", id);
			const response = await deleteEvent(formData);
			if (response?.error) {
				console.error(response.error);
			} else {
				setTableData((prevData) =>
					prevData.filter((event) => event.id !== id),
				);
			}
		} catch (error) {
			console.error("Error deleting event:", error);
		}
	};

	const filterData = () => {
		let filtered = data;

		// Filter by date range
		if (dateStart && dateEnd) {
			const start = new Date(dateStart);
			const end = new Date(dateEnd);
			filtered = filtered.filter(({ startDate }) => {
				const eventDate = new Date(startDate);
				return eventDate >= start && eventDate <= end;
			});
		}

		// Filter by search keyword
		if (searchKeyword) {
			const keyword = searchKeyword.toLowerCase();
			filtered = filtered.filter((item) =>
				Object.values(item).some((val) =>
					val
						? val.toString().toLowerCase().includes(keyword)
						: false,
				),
			);
		}

		// Sort data based on orders
		let sortedData = filtered;
		Object.keys(orders).forEach((category) => {
			// @ts-ignore
			if (orders[category] !== Order.Default) {
				sortedData = OrderByCategory(
					sortedData,
					category,
					// @ts-ignore
					orders[category],
					setOrders,
				);
			}
		});

		setTableData(sortedData);
	};

	const handleSort = (category: string) => {
		const sortedData = OrderByCategory(
			tableData,
			category,
			// @ts-ignore
			orders[category],
			setOrders,
		);
		setTableData(sortedData);
	};

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchKeyword(event.target.value);
	};

	return (
		<div className="flex min-h-screen justify-center bg-slate-900 text-white">
			<div className="mt-10 flex min-h-[75vh] flex-col justify-start sm:my-auto md:min-w-[80%]">
				<div className="grid grid-rows-2">
					<div className="flex items-center justify-between">
						<input
							type="text"
							placeholder="Search..."
							value={searchKeyword}
							onChange={handleSearch}
							className="w-3/4 rounded-lg bg-slate-800 text-white sm:p-2"
						/>
						<Link href="/dashboard/events/create">
							<button className="m-3 rounded-lg bg-blue-500 sm:p-3">
								Add new event
							</button>
						</Link>
					</div>
					<div className="mt-2 flex items-center justify-evenly">
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
										<td>
											<XMarkIcon
												className="size-6 cursor-pointer rounded-xl bg-red-500"
												onClick={() =>
													handleDeleteEvent(id)
												}
											/>
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
