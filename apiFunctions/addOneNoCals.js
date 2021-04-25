import axios from 'axios';
import { auth } from '../config/firebase';

const addOneRecipeNoCals = (authorizationId, recipe, recipeId) => {
	return axios({
		method: 'post',
		url: `${process.env.NEXT_PUBLIC_URL}/api/recipe`,
		headers: { authorization: authorizationId },
		data: {
			originalUrl: recipe.originalUrl,
			id: recipeId,
			title: recipe.title,
			userId: auth.currentUser.uid,
			servings: recipe.servings,
			image: recipe.image,
			ingredients: recipe.extendedIngredients.length
				? recipe.extendedIngredients.map(ingredient => ingredient.original)
				: recipe.ingredients,
			readyInMinutes: recipe.readyInMinutes,
			info: recipe.info,
			instructions: recipe.extendedInstructions.length
				? recipe.extendedInstructions.map(instruction => instruction.step)
				: recipe.instructions,
		},
	})
		.then(response => {
			console.log('success');
		})
		.catch(err => {
			if (err.response) {
				//	Client received an error resonse (5xx, 4xx)
				console.log(err);
			} else if (err.request) {
				//	Client never received a response, or request never left
				console.log(err);
			} else {
				//	Anything else
				console.log(err);
			}
		});
};

export default addOneRecipeNoCals;
