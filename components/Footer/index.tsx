import { validateRequest } from "@/lib/db";

export default async function Footer() {
	const { session } = await validateRequest();

	if (session) {
		return <></>;
	}

	return (
		<>
			<footer className="bg-white dark:bg-slate-900 text-center ">
				<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
					<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
						© 2024{" "}
						<a
							href="https://flowbite.com/"
							className="hover:underline"
						>
							Nemetschek IT Conference™
						</a>
						<br />
						All Rights Reserved.
					</span>
				</div>
			</footer>
		</>
	);
}
