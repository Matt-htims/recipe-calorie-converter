import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../../config/firebase';
import axios from 'axios';

const IndividualRecipe = () => {
	const router = useRouter();

	const { id } = router.query;

	const [recipe, setRecipe] = useState({});

	const handleRecipeShow = () => {
		console.log(recipe);
	};

	const handleDelete = () => {
		auth.currentUser
			? auth.currentUser
					.getIdToken(/* forceRefresh */ true)
					.then(function (idToken) {
						axios({
							method: 'DELETE',
							url: `http://localhost:3000/api/recipe/${id}`,
							//	Just doing it to recipes api rather than recipe/[id] as no way of getting a specific recipe just the entire document of the user
							headers: { authorization: idToken },
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
					})
					.catch(function (error) {
						// Handle error
					})
			: console.log('Not logged in', auth);
	};

	useEffect(() => {
		auth.currentUser
			? auth.currentUser
					.getIdToken(/* forceRefresh */ true)
					.then(function (idToken) {
						axios({
							method: 'GET',
							url: `http://localhost:3000/api/recipe/${id}`,
							//	Just doing it to recipes api rather than recipe/[id] as no way of getting a specific recipe just the entire document of the user
							headers: { authorization: idToken },
						})
							.then(response => {
								console.log(response);
								console.log('success');
								setRecipe(response.data);
							})
							.catch(err => {
								setRecipe({ error: true });
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
					})
					.catch(function (error) {
						// Handle error
					})
			: console.log('Not logged in', auth);
	}, [auth.currentUser]);

	return (
		<div>
			<h1 onClick={handleRecipeShow}>Indiv</h1>
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
};

export default IndividualRecipe;
