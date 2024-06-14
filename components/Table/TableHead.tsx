import {
	ChevronDownIcon,
	ChevronUpDownIcon,
	ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { Order } from ".";

export default function TableHead({
	orders,
	handleSort,
}: {
	orders: {
		name: Order;
		city: Order;
		startDate: Order;
		type: Order;
	};
	handleSort: (category: string) => void;
}) {
	return (
		<thead className="">
			<tr className="text-left">
				<th
					onClick={() => handleSort("name")}
					className="cursor-pointer select-none p-3 font-semibold leading-6 md:pl-0"
				>
					Име
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
					Град
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
					Начална дата
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
					className="hidden cursor-pointer select-none p-3 font-semibold leading-6 md:table-cell md:pl-0"
				>
					Вид
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
	);
}
