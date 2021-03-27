import React from 'react';

const Sidebar = ({ img, ingredients }) => {
	return (
		<div className="bg-white shadow-xl px-5 py-10 md:p-3 rounded-2xl md:w-1/4 space-y-8">
			<img
				className="rounded-lg w-full h-80 md:h-auto object-cover"
				src={img}
				alt=""
			/>
			<div className="ingredients">
				<h3 className="font-sans font-medium text-xl pb-2">Ingredients</h3>
				<ul className="text-sm text-gray-900">
					{ingredients.map((ingredient, index) => (
						<div key={`ingredient-${index}`} className="flex space-x-2">
							<p>- </p>
							<li>{ingredient}</li>
						</div>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
