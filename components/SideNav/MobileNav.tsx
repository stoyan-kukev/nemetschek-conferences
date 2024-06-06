"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function MobileNav({
	items,
}: {
	items: { text: string; href: string; icon: JSX.Element }[];
}) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="sm:hidden fixed inline-flex w-full justify-between items-center p-2 text-white bg-slate-900"
			>
				<span className="absolute -inset-0.5" />
				<span className="sr-only">Open main menu</span>
				<h2 className="font-bold border-white border-2 rounded-xl p-2">
					Nemetschek Conferences
				</h2>
				<Bars3Icon className="block h-8 w-8" aria-hidden="true" />
			</button>

			<Dialog className="relative z-10" onClose={setOpen} open={open}>
				<div className="fixed inset-0 bg-slate-900" />

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<DialogPanel className="pointer-events-auto relative w-screen max-w-md">
								<div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
									<button
										type="button"
										className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
										onClick={() => setOpen(false)}
									>
										<span className="absolute -inset-2.5" />
										<span className="sr-only">
											Close panel
										</span>
										<XMarkIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</button>
								</div>
								<div className="flex h-full flex-col overflow-y-scroll bg-white  shadow-xl">
									{/* <div className="px-4 sm:px-6">
									<DialogTitle className="text-base font-semibold leading-6 text-gray-900">
										Panel title
									</DialogTitle>
								</div> */}
									<div className="relative flex-1">
										<Nav items={items} />
									</div>
								</div>
							</DialogPanel>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
}

function Nav({
	items,
}: {
	items: { text: string; href: string; icon: JSX.Element }[];
}) {
	return (
		<>
			<nav className="absolute inset-0 bg-slate-900 flex flex-col flex-1 overflow-hidden text-white pt-10">
				<ul className="gap-y-7 flex flex-col flex-1">
					{items.map((item) => (
						<>
							<li>
								<ul className="-mx-2">
									<li>
										<a
											className="leading-6 p-2 ml-4 gap-x-3 flex"
											href={item.href}
										>
											{item.icon}
											{item.text}
										</a>
									</li>
								</ul>
							</li>
						</>
					))}

					<li></li>
					<a
						href="/logout"
						className=" mt-auto cursosr text-center bg-red-500 text-white   "
					>
						<li>
							<button className=" mx-6 py-3 ">Sign out</button>
						</li>
					</a>
				</ul>
			</nav>
		</>
	);
}
