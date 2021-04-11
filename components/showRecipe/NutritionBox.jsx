import React from 'react';

const NutritionBox = ({ name, amount, percent, unit }) => {
	return (
		<div
			className={`calories flex flex-col items-center shadow-inner rounded-lg w-28 py-2 ${
				name === 'Calories' ? 'border border-green' : ''
			}`}
		>
			<h4 className="font-sans font-medium text-sm text-gray-800">{name}</h4>
			<p className="font-accent font-medium md:text-2xl text-lg text-gray-900 h-full">
				{amount}
				<span className="md:text-xl text-sm text-gray-700 font-normal font-sans">
					{unit}
				</span>
			</p>
			<div
				className={`percent w-11/12 md:h-full text-center p-1 rounded-md h-full ${
					percent > 50 ? 'bg-red' : percent > 30 ? 'bg-amber' : 'bg-green'
				}`}
			>
				<p className="font-accent text-xl font-medium text-white">{percent}%</p>
			</div>
		</div>
	);
};

export default NutritionBox;
