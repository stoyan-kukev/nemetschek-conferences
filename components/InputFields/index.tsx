export default function InputFields({
	items,
}: {
	items: { col: string; labelName: string; value?: string }[];
}) {
	return items.map((item) => {
		const htmlName = item.labelName.toLowerCase().replaceAll(" ", "-");

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
					</div>
				</div>
			</>
		);
	});
}
