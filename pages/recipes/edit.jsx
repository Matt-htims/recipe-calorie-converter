import { useEffect } from 'react';
import { useRouter } from 'next/router';

import EditUnsavedRecipe from '../../components/EditUnsavedRecipe';

import { enteredRecipeStore } from '../../zustand-state/enteredRecipeState';

const Edit = () => {
	const router = useRouter();
	const recipe = enteredRecipeStore(state => state.recipe);

	useEffect(() => {
		if (!recipe.populated) {
			router.push('/recipes');
		}
	}, [recipe]);

	if (!recipe.populated) {
		return '';
	}
	return (
		<div className="w-11/12 md:w-9/12 m-auto mt-12 space-y-0 md:space-y-12 max-w-7xl min-h-screen">
			<h1 className="text-center text-3xl md:text-4xl text-darkBlue font-accent font-bold">
				Edit your recipe before saving
			</h1>
			<div className="bg-white shadow-xl px-5 py-10 md:p-12 rounded-2xl">
				<EditUnsavedRecipe />
			</div>
		</div>
	);
};

export default Edit;
