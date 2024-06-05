import Profile from "@/components/UserProfile/Profile";
import { validateRequest } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { session } = await validateRequest();

	if (!session) {
		return redirect("/");
	}

	return <>{children}</>;
}
