export default function InputFields({
	items,
	state,
}: {
	items: { col: string; labelName: string; value?: string }[];
	state: { errors?: any; message?: any };
}) {
	return items.map((item) => {
		const htmlName = item.labelName.toLowerCase().replaceAll(" ", "_");

		return (
			<>
				<div className={item.col}>
					<label
						className="block text-sm leading-6 font-medium"
						htmlFor={htmlName}
					>
						{item.labelName}
					</label>
					<div className="mt-2">
						<input
							type={
								htmlName.includes("password")
									? "password"
									: "text"
							}
							id={htmlName}
							name={htmlName}
							className="ring-gray-800/10 ring-inset ring-2 
								shadow-sm text-white bg-white/5 rounded-md w-full"
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
			</>
		);
	});
}
