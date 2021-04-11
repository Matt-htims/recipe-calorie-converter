import axios from 'axios';

const getAllRecipes = authorizationID => {
	return axios({
		method: 'get',
		url: 'http://localhost:3000/api/recipes',
		headers: { authorization: authorizationID },
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

export default getAllRecipes;
