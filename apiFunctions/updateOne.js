import axios from 'axios';

//	Divide by servings function
const divByServings = (value, servings) => {
	return Math.round(value / servings);
};

const updateOneRecipe = (authorizationId, recipeId, values, update, data) => {
	if (!update) {
		return axios({
			method: 'PUT',
			url: `${process.env.NEXT_PUBLIC_URL}/api/recipe/${recipeId}`,
			//	Just doing it to recipes api rather than recipe/[id] as no way of getting a specific recipe just the entire document of the user
			headers: { authorization: authorizationId },
			data: {
				title: values.recipeName,
				image: values.image,
				info: {
					dairyFree: values.dairyFree,
					glutenFree: values.glutenFree,
					vegetarian: values.vegetarian,
					vegan: values.vegan,
				},
				readyInMinutes: values.readyInMinutes,
				title: values.recipeName,
				ingredients: values.ingredients.split('\n'),
				instructions: values.instructions.split('\n'),
				servings: values.servings,
				calorieInfo: values.calorieInfo,
			},
		})
			.then(response => {
				console.log(response);
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
	} else {
		return axios({
			method: 'PUT',
			url: `http://localhost:3000/api/recipe/${recipeId}`,
			//	Just doing it to recipes api rather than recipe/[id] as no way of getting a specific recipe just the entire document of the user
			headers: { authorization: authorizationId },
			data: {
				title: values.title,
				image: values.image,
				info: {
					dairyFree: values.dairyFree,
					glutenFree: values.glutenFree,
					vegetarian: values.vegetarian,
					vegan: values.vegan,
				},
				readyInMinutes: values.readyInMinutes,
				title: values.recipeName,
				ingredients: values.ingredients.split('\n'),
				instructions: values.instructions.split('\n'),
				servings: values.servings,
				calorieInfo: {
					calories: divByServings(data.calories, values.servings),

					totalNutrientsGrams: {
						carbs: divByServings(
							data.totalNutrients.CHOCDF.quantity,
							values.servings
						),
						protein: divByServings(
							data.totalNutrients.PROCNT.quantity,
							values.servings
						),
						fat: divByServings(
							data.totalNutrients.FAT.quantity,
							values.servings
						),
					},
					totalDailyPercent: {
						carbs: divByServings(
							data.totalDaily.CHOCDF.quantity,
							values.servings
						),
						calories: divByServings(
							data.totalDaily.ENERC_KCAL.quantity,
							values.servings
						),
						protein: divByServings(
							data.totalDaily.PROCNT.quantity,
							values.servings
						),
						fat: divByServings(data.totalDaily.FAT.quantity, values.servings),
					},
				},
			},
		})
			.then(response => {
				console.log(response);
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
	}
};

export default updateOneRecipe;
