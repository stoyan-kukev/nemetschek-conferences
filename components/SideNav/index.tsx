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
		icon: <FolderIcon className="h-6 w-6 flex-shrink-0" />,
	},
	{
		text: "Deployments",
		icon: <ServerIcon className="h-6 w-6 flex-shrink-0" />,
	},
	{
		text: "Activity",
		icon: <SignalIcon className="h-6 w-6 flex-shrink-0" />,
	},
	{
		text: "Domains",
		icon: <GlobeAltIcon className="h-6 w-6 flex-shrink-0" />,
	},
	{ text: "Usage", icon: <ChartBarIcon className="h-6 w-6 flex-shrink-0" /> },
	{
		text: "Settings",
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
