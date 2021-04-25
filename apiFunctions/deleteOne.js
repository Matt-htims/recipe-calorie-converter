import axios from 'axios';

const deleteOneRecipe = (authorizationId, recipeId) => {
	return axios({
		method: 'DELETE',
		url: `${process.env.NEXT_PUBLIC_URL}/api/recipe/${recipeId}`,
		//	Just doing it to recipes api rather than recipe/[id] as no way of getting a specific recipe just the entire document of the user
		headers: { authorization: authorizationId },
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
};

export default deleteOneRecipe;
