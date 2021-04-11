import axios from 'axios';

const nutritionRequest = recipe => {
	console.log(recipe);
	return axios({
		method: 'post',
		url: process.env.NEXT_PUBLIC_EDAMAM_URL,
		data: {
			title: recipe.title,
			ingr: recipe.extendedIngredients.length
				? recipe.extendedIngredients.map(ingredient => ingredient.original)
				: recipe.ingredients,
		},
	})
		.then(response => response.data)
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

export default nutritionRequest;
