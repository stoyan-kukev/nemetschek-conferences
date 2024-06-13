import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { classNames } from "./LoggedOutNav";

export function MobileMenu({
	navigation,
}: {
	navigation: {
		name: string;
		href: string;
		current: boolean;
	}[];
}) {
	return (
		<>
			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pb-3 pt-2">
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as="a"
							href={item.href}
							className={classNames(
								item.current
									? "bg-gray-900 text-white"
									: "text-gray-300 hover:bg-gray-700 hover:text-white",
								"block rounded-md px-3 py-2 text-base font-medium",
							)}
							aria-current={item.current ? "page" : undefined}
						>
							{item.name}
						</DisclosureButton>
					))}
				</div>
			</DisclosurePanel>
		</>
	);
}
