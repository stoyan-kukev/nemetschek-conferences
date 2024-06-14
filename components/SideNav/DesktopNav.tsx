import Link from "next/link";

export default function DesktopNav({
	items,
}: {
	items: { text: string; href: string; icon: JSX.Element }[];
}) {
	return (
		<>
			<div className="hidden bg-slate-800 text-white sm:fixed sm:bottom-0 sm:top-0 sm:z-50 sm:flex sm:w-[18rem] sm:flex-col">
				<div className="flex flex-grow flex-col gap-y-5 overflow-hidden">
					<div className="flex h-16 flex-shrink-0 items-center justify-center">
						<h2 className="rounded-xl bg-indigo-600/50 p-3 font-bold text-white">
							Nemetschek Conferences
						</h2>
					</div>
					<nav className="flex flex-1 flex-col">
						<ul className="flex flex-1 flex-col gap-y-7">
							{items.map((item) => (
								<li key={item.text}>
									<ul className="-mx-2">
										<li>
											<Link
												className="ml-4 flex gap-x-3 p-2 leading-6"
												href={item.href}
											>
												{item.icon}
												{item.text}
											</Link>
										</li>
									</ul>
								</li>
							))}

							<li></li>
							<Link
								href="/dashboard/logout"
								className="cursosr mt-auto bg-red-500 text-center text-white"
							>
								<li>
									<button className="mx-6 py-3">Излез</button>
								</li>
							</Link>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
}
