export default function DesktopNav({
	items,
}: {
	items: { text: string; icon: JSX.Element }[];
}) {
	return (
		<>
			<div className="hidden xl:fixed xl:top-0 xl:bottom-0 xl:z-50 xl:flex xl:flex-col xl:w-[18rem] bg-slate-800 text-white">
				<div className="overflow-hidden flex flex-col gap-y-5 flex-grow">
					<div className="flex flex-shrink-0 h-16 justify-center items-center ">
						<h2 className="font-bold border-white border-2 rounded-xl p-3">
							Nemetschek Conferences
						</h2>
					</div>
					<nav className="flex flex-col flex-1">
						<ul className="gap-y-7 flex flex-col flex-1">
							{items.map((item) => (
								<>
									<li>
										<ul className="-mx-2">
											<li>
												<a
													className="leading-6 p-2 ml-4 gap-x-3 flex"
													href="#"
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
									<button className=" mx-6 py-3 ">
										Sign out
									</button>
								</li>
							</a>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
}
