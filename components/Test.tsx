import fetchUsers from "@/actions/fetchUsers";
import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import {
	MagnifyingGlassCircleIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default async function Test() {
	let [isOpen, setIsOpen] = useState(false);

	const onSubmit = async (formData: FormData) => {
		const users = await fetch("/users/search");
		if (users === undefined) {
		}

		console.log(users);
	};

	return (
		<>
			<button onClick={() => setIsOpen(true)}>Open dialog</button>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className="relative z-50 text-white"
			>
				<div className="fixed inset-0 flex w-screen items-center justify-center bg-black/20 text-center">
					<DialogPanel className="max-w-7xl w-4/5 md:w-1/2 space-y-5 bg-[#2E415D] p-3 rounded-xl drop-shadow-2xl shadow-2xl">
						<DialogTitle className="text-xl">
							Добави лектор
						</DialogTitle>
						<form
							className="flex justify-evenly p-3"
							action={onSubmit}
						>
							<input
								className="ring-gray-800/10 ring-inset ring-2 
								shadow-sm text-white bg-white/5 rounded-md w-3/4"
								type="text"
								name="search"
							/>
							<button
								type="submit"
								className="size-10 flex justify-center items-center rounded-xl bg-white/20"
							>
								<MagnifyingGlassIcon className="size-6" />
							</button>
						</form>
						<div className="flex justify-between gap-4">
							<button
								className="bg-red-500 px-5 py-3 rounded-lg"
								onClick={() => setIsOpen(false)}
							>
								Назад
							</button>
							<button
								className="bg-green-500 px-5 py-3 rounded-lg"
								onClick={() => setIsOpen(false)}
							>
								Готово
							</button>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	);
}
