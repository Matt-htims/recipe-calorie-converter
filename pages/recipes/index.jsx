import axios from 'axios';
import { useState, useEffect } from 'react';
import { auth } from '../../config/firebase.js';
import { useAuth } from '../../hooks/useAuth';

//	Components
import IndivRecipe from '../../components/showRecipe/IndivRecipe';

const Recipes = () => {
	const { user } = useAuth();
	const [recipes, setRecipes] = useState();

	useEffect(() => {
		auth.currentUser
			? auth.currentUser
					.getIdToken(/* forceRefresh */ true)
					.then(function (idToken) {
						axios({
							method: 'get',
							url: 'http://localhost:3000/api/recipes',
							headers: { authorization: idToken },
						})
							.then(response => {
								console.log(response);
								console.log('success');
								setRecipes(response.data);
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
			: console.log('Not logged in');
	}, [auth.currentUser]);

	if (user) {
		return (
			<div className="min-h-screen bg-backgroundWhite max-w-7xl m-auto">
				<h1 className="text-center text-3xl md:text-5xl text-darkBlue font-accent font-normal pt-10">
					Recipes
				</h1>
				<p onClick={() => console.log(recipes)}>aslkdjfsladkf</p>
				<div className="flex flex-col space-y-6 items-center">
					{recipes
						? recipes.map(recipe => {
								return (
									<IndivRecipe
										key={recipe.id}
										title={recipe.title}
										calories={
											recipe.calorieInfo ? recipe.calorieInfo.calories : 'none'
										}
										id={recipe.id}
										image={recipe.image}
									/>
								);
						  })
						: ''}
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h1>You are not logged in</h1>
			</div>
		);
	}
};

export default Recipes;
