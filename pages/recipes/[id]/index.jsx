import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../../config/firebase';
import axios from 'axios';

//	Components
import Sidebar from '../../../components/showRecipe/Sidebar';
import MainSection from '../../../components/showRecipe/MainSection';
import DeleteConfirm from '../../../components/DeleteConfirm';

const IndividualRecipe = () => {
	const router = useRouter();

	const { id } = router.query;

	const [recipe, setRecipe] = useState({});
	const [deleteOpen, setDeleteOpen] = useState(false);

	//	Handlers for delete confirmation
	const handleOpenDelete = () => {
		setDeleteOpen(true);
	};

	const handleCloseDelete = () => {
		setDeleteOpen(false);
	};

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
								router.push('/recipes');
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

	if (recipe.title) {
		return (
			<div className="min-h-screen pt-12">
				{deleteOpen && (
					<DeleteConfirm
						action="delete"
						discardFunc={handleDelete}
						cancelFunc={handleCloseDelete}
					/>
				)}

				<div className="w-11/12 m-auto space-y-0 md:space-y-12 max-w-7xl">
					<h1
						className="text-center text-3xl md:text-4xl text-darkBlue font-accent font-bold"
						onClick={handleRecipeShow}
					>
						Individual recipe
					</h1>
					<div className="main-section space-y-6 md:space-y-0 md:space-x-5 md:flex">
						<div className="md:w-1/4">
							<Sidebar img={recipe.image} ingredients={recipe.ingredients} />
						</div>

						<MainSection
							title={recipe.title}
							servings={recipe.servings}
							time={recipe.readyInMinutes}
							info={recipe.info}
							openDelete={handleOpenDelete}
							saved={true}
							instructions={recipe.instructions}
							nutrition={recipe.calorieInfo}
						/>
					</div>
				</div>
			</div>
		);
	}
	return <h1>error</h1>;
};

export default IndividualRecipe;
