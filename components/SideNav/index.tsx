import {
	ChartBarIcon,
	Cog6ToothIcon,
	FolderIcon,
	GlobeAltIcon,
	ServerIcon,
	SignalIcon,
} from "@heroicons/react/24/outline";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const items = [
	{
		text: "Projects",
		href: "/dashboard/projects",
		icon: <FolderIcon className="h-6 w-6 flex-shrink-0" />,
	},
	{
		text: "Deployments",
		href: "/dashboard/projects",
		icon: <ServerIcon className="h-6 w-6 flex-shrink-0" />,
	},
	{
		text: "Activity",
		href: "/dashboard/projects",
		icon: <SignalIcon className="h-6 w-6 flex-shrink-0" />,
	},
	{
		text: "Domains",
		href: "/dashboard/projects",
		icon: <GlobeAltIcon className="h-6 w-6 flex-shrink-0" />,
	},
	{
		text: "Usage",
		href: "/dashboard/usage",
		icon: <ChartBarIcon className="h-6 w-6 flex-shrink-0" />,
	},
	{
		text: "Settings",
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
