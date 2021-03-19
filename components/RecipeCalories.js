import React from 'react';

import { recipeStore } from '../zustand';

const RecipeCalories = () => {
	//	State
	const recipeData = recipeStore(state => state.recipeData);

	//Handler
	const printState = () => {
		console.log(recipeData);
	};

	const { data } = recipeData;
	return (
		<div>
			<h1 onClick={printState}>Recipe calories</h1>
			<p>{data && data.calories}</p>
		</div>
	);
};

export default RecipeCalories;
