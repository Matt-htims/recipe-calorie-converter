import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';

//	Components
import IndivRecipe from '../week-planner/IndivRecipe';
import NotLogged from '../NotLogged';
// import Loader from '../Loader';
import { Loader } from 'semantic-ui-react';

// Api requests
import getAll from '../../apiFunctions/getAll';

const AllRecipeSection = ({ close, addMeal }) => {
	const router = useRouter();
	const { user } = useAuth();
	const [recipes, setRecipes] = useState();
	const [loading, setLoading] = useState(false);

	//	Day and meal to add to
	const { day, meal } = router.query;

	useEffect(() => {
		window.scrollTo(0, 0);
		document.body.style.overflow = 'hidden';
		return function cleanup() {
			document.body.style.overflow = null;
		};
	}, []);

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

	if (loading)
		return (
			<div className="w-screen h-full absolute top-0 left-0">
				<div className="fixed w-full top-72 z-20">
					<Loader active inverted inline="centered" />
				</div>
				<div className="bg-gray-1000 opacity-30 z-10 h-full w-full"></div>
			</div>
		);
	if (!user) return <NotLogged />;
	return (
		<>
			<div className="w-screen h-full absolute top-0 left-0">
				<div
					onClick={close}
					className="bg-gray-1000 opacity-50 z-10 h-full w-full"
				></div>
				<div className="flex justify-center">
					<div className="fixed top-28 overflow-y-scroll h-5/6 w-10/12 bg-backgroundWhite max-w-7xl rounded-lg shadow-2xl">
						<h1 className="text-center text-3xl md:text-5xl text-darkBlue font-accent font-normal md:py-10 py-4 m-0">
							Add a recipe
						</h1>

						<div className="flex flex-col space-y-6 items-center p-6">
							{recipes
								? recipes.map(recipe => {
										return (
											<IndivRecipe
												key={recipe.id}
												calories={
													recipe.calorieInfo ? recipe.calorieInfo.calories : ''
												}
												addMeal={addMeal}
												recipe={recipe}
												day={day}
												meal={meal}
												close={close}
											/>
										);
								  })
								: ''}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AllRecipeSection;
