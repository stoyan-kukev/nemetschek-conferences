export default function InputFields({
	items,
	state,
}: {
	items: { col: string; labelName: string; value?: string }[];
	state: { errors?: any; message?: any };
}) {
	return items.map((item) => {
		const htmlName = item.labelName.toLowerCase().replaceAll(" ", "_");
		const key = Math.floor(Math.random() * 100);

		return (
			<div className={item.col} key={key}>
				<label
					className="block text-sm font-medium leading-6"
					htmlFor={htmlName}
				>
					{item.labelName}
				</label>
				<div className="mt-2">
					<input
						type={
							htmlName.includes("password") ? "password" : "text"
						}
						name={htmlName}
						className="w-full rounded-md bg-white/5 text-white shadow-sm ring-2 ring-inset ring-gray-800/10"
						defaultValue={item.value}
					/>
					<div
						id="customer-error"
						aria-live="polite"
						aria-atomic="true"
					>
						{state.errors &&
							state.errors[htmlName] &&
							state.errors[htmlName].map((error: string) => (
								<p
									className="mt-2 text-sm text-red-500"
									key={error}
								>
									{error}
								</p>
							))}
					</div>
				</div>
			</div>
		);
	});
}
