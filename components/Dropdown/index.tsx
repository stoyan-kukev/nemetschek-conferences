import { Fragment } from "react";
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Dropdown() {
	return (
		<Menu as="div" className="relative w-full text-left">
			<div>
				<MenuButton className="mt-2 w-full cursor-pointer select-none rounded-lg border-2 border-dotted border-gray-500 p-5 text-center">
					<div className="">
						Добави лектор{" "}
						<PlusIcon className="inline size-6 text-white" />
					</div>
				</MenuButton>
			</div>

			<MenuItems className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-slate-800 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
				<div className="py-1">
					<MenuItem>
						<Link href="#" className="block px-2 py-2 text-sm">
							Account settings
						</Link>
					</MenuItem>
				</div>
			</MenuItems>
		</Menu>
	);
}
