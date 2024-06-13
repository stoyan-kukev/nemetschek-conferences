import Link from "next/link";

export default function Footer() {
	return (
		<>
			<footer className="bg-white text-center dark:bg-slate-900">
				<div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
					<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
						© 2024{" "}
						<Link
							href="http://localhost:3000/"
							className="hover:underline"
						>
							Nemetschek IT Conference™
						</Link>
						<br />
						All Rights Reserved.
					</span>
				</div>
			</footer>
		</>
	);
}
