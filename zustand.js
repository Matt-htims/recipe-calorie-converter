import create from 'zustand';
import { devtools } from 'zustand/middleware';

const recipeInitialState = {
cookingMinutes: '',
extendedIngredients: [],
image: '',
instructions: [],
preparationMinutes: '',
readyInMinutes: '',
servings: '',
summary: '',
title: '',
info: {
	vegetarian: false,
	dairyFree: false,
	glutenFree: false,
	pricePerServing: '',
	sustainable: false,
	vegan: false,
	veryHealthy: true,
}}

export const enteredRecipeStore = create(devtools(set => ({
	isError: false,
	isLoading: false,
	recipe: recipeInitialState,
	actions: {
		searchDataRequest: () => set(state => ({isLoading: true, isError: false})),
		searchDataSuccess: data => set(state => ({isLoading: false, isError: false, recipe: data})),
		searchDataFailure: () => set(state => ({...state, isLoading: false, isError: true})),
		resetState: () => set(state => ({isLoading: false, isError: false, recipe: recipeInitialState}))
	}
})))