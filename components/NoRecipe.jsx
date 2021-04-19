import React from 'react';

const NoRecipe = () => {
	return (
		<div className="min-h-screen flex justify-center items-center">
			<div className="mb-20 flex items-center space-x-10">
				<h1 className="m-0 text-3xl font-bold">Error 404</h1>
				<p className="m-0 text-4xl font-accent font-light">|</p>
				<p className="font-sans text-xl">That recipe does not exist</p>
			</div>
		</div>
	);
};

export default NoRecipe;
