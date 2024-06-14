import { fetchEvents } from "@/actions/fetchEvents";
import Table from "@/components/Table";

export default async function Page() {
	const data = await fetchEvents();

	return (
		<>
			<Table data={data} />
		</>
	);
}
