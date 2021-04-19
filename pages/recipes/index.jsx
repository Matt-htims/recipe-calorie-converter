import { useState, useEffect } from 'react';
import { auth } from '../../config/firebase.js';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

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
		let mounted = true;

		setLoading(true);
		auth.currentUser
			? auth.currentUser
					.getIdToken(/* forceRefresh */ true)
					.then(function (idToken) {
						getAll(idToken)
							.then(response => {
								setRecipes(response);
								mounted ? setLoading(false) : '';
							})
							.catch(err => {
								mounted ? setLoading(false) : '';
							});
					})
					.catch(function (error) {
						mounted ? setLoading(false) : '';
					})
			: console.log('Not logged in');
		setTimeout(() => {
			mounted ? setLoading(false) : '';
		}, 3000);

		return function cleanup() {
			mounted = false;
		};
	}, [auth.currentUser, user]);

	if (loading) return <Loader />;
	if (!user) return <NotLogged />;
	return (
		<div className="min-h-screen bg-backgroundWhite max-w-7xl m-auto">
			<div className="flex items-center w-11/12 mx-auto justify-between">
				<h1 className="text-center text-3xl md:text-5xl text-darkBlue font-accent font-normal md:py-16 py-8 m-0">
					My recipes
				</h1>
				<Link href="/recipes/new">
					<a>
						<p className="cursor-pointer md:p-3 p-2 border font-sans font-medium text-darkBlue md:text-base text-sm rounded-md border-darkBlue hover:text-white hover:bg-darkBlue">
							Add recipes
						</p>
					</a>
				</Link>
			</div>
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
