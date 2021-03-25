import React from 'react';

//	Zustand state
import {enteredRecipeStore} from '../../zustand'

const ConfirmRecipe = () => {
	//	Entered Recipe State
	const isLoading = enteredRecipeStore(state => state.isLoading)
	const isError = enteredRecipeStore(state => state.isError)
	const recipe = enteredRecipeStore(state => state.recipe)
	return (
		<div>
			<h1>Confirm recipe</h1>
			<p>{recipe.title}</p>
			<img src={recipe.image} alt=""/>
		</div>
	);
};

export default ConfirmRecipe;