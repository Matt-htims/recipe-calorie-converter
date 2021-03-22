import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const recipeStore = create(
	devtools(set => ({
		title: '',
		titleSaved: '',
		indivIngredient: '',
		ingr: [],
		recipeData: {},
		updateTitle: newTitle => set(state => ({ title: newTitle })),
		updateIndivIngredient: newIndivIngredient =>
			set(state => ({ indivIngredient: newIndivIngredient })),
		updateIngr: newIngr =>
			set(state => ({
				ingr: [...state.ingr, newIngr],
				indivIngredient: '',
			})),
		setRecipeTitle: title => set(state => ({ titleSaved: title, title: '' })),
		resetRecipeState: () =>
			set(state => ({
				title: '',
				titleSaved: '',
				indivIngredient: '',
				ingr: [],
			})),
		setRecipeData: res => set(state => ({ recipeData: res })),
	}))
);
