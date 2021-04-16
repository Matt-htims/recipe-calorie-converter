import { useState, useEffect } from 'react';
import { auth } from '../../config/firebase.js';
import { useAuth } from '../../hooks/useAuth';

//	Components
import IndivRecipe from '../../components/showRecipe/IndivRecipe';
import NotLogged from '../../components/NotLogged';
import Loader from '../../components/Loader';

// Api requests
import getAll from '../../api/getAll';

const Recipes = () => {
	const { user } = useAuth();
	const [recipes, setRecipes] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		auth.currentUser
			? auth.currentUser
					.getIdToken(/* forceRefresh */ true)
					.then(function (idToken) {
						getAll(idToken)
							.then(response => {
								setRecipes(response);
								setLoading(false);
							})
							.catch(err => {
								setLoading(false);
							});
					})
					.catch(function (error) {
						setLoading(false);
					})
			: console.log('Not logged in');
		setLoading(false);
	}, [auth.currentUser, user]);

	if (loading) return <Loader />;
	if (!user) return <NotLogged />;
	return (
		<div className="min-h-screen bg-backgroundWhite max-w-7xl m-auto">
			<h1 className="text-center text-3xl md:text-5xl text-darkBlue font-accent font-normal pt-20 pb-14">
				Recipes
			</h1>
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
};

export default Recipes;
