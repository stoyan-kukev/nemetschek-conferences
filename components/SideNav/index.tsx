import {
	Cog6ToothIcon,
	GlobeAltIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const items = [
	{
		text: "Събития",
		href: "/dashboard/events",
		icon: <GlobeAltIcon className="h-6 w-6 flex-shrink-0" />,
	},
	{
		text: "Потребители",
		href: "/dashboard/users",
		icon: <UserGroupIcon className="h-6 w-6 flex-shrink-0" />,
	},
	{
		text: "Настройки",
		href: "/dashboard/settings",
		icon: <Cog6ToothIcon className="h-6 w-6 flex-shrink-0" />,
	},
];

/* eslint-disable @next/next/no-img-element */
export default function SideNav() {
	return (
		<>
			<DesktopNav items={items} />

			<MobileNav items={items} />
		</>
	);
}
