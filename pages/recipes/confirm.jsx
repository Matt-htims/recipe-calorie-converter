import { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../../config/firebase';
import uniqid from 'uniqid';

import { useRouter } from 'next/router';

//	Zustand state
import { enteredRecipeStore } from '../../zustand';

//	Components
import Sidebar from '../../components/showRecipe/Sidebar';
import MainSection from '../../components/showRecipe/MainSection';
import DeleteConfirm from '../../components/DeleteConfirm';

const ConfirmRecipe = () => {
	const router = useRouter();

	//	Entered Recipe State
	const isLoading = enteredRecipeStore(state => state.isLoading);
	const isError = enteredRecipeStore(state => state.isError);
	const recipe = enteredRecipeStore(state => state.recipe);
	const resetState = enteredRecipeStore(state => state.actions.resetState);

	//	State
	const [deleteOpen, setDeleteOpen] = useState(false);

	//	Recipe save handler
	const handleRecipeSave = () => {
		auth.currentUser
			? auth.currentUser
					.getIdToken(/* forceRefresh */ true)
					.then(function (idToken) {
						axios({
							method: 'post',
							url: 'http://localhost:3000/api/recipe',
							headers: { authorization: idToken },
							data: {
								id: uniqid(),
								title: recipe.title,
								userId: auth.currentUser.uid,
								servings: recipe.servings,
								image: recipe.image,
								ingredients: recipe.extendedIngredients.length
									? recipe.extendedIngredients
									: recipe.ingredients,
								readyInMinutes: recipe.readyInMinutes,
								info: recipe.info,
								instructions: recipe.extendedInstructions.length
									? recipe.extendedInstructions
									: recipe.instructions,
							},
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
			: console.log('Not logged in'); //	Need to add in some logic to say not logged in but likely will just prevent adding alltogether unless logged in
	};

	//	Handlers for delete confirmation
	const handleOpenDelete = () => {
		setDeleteOpen(true);
	};

	const handleCloseDelete = () => {
		setDeleteOpen(false);
	};

	const handleDiscard = () => {
		handleCloseDelete();
		resetState();
	};

	useEffect(() => {
		if (!recipe.populated) {
			router.push('/recipes/new');
		}
	}, [deleteOpen]);

	return (
		<>
			{!recipe.populated ? (
				''
			) : (
				<>
					{isLoading ? (
						<h1>Loading...</h1>
					) : isError ? (
						<h1>Error</h1>
					) : (
						<>
							{deleteOpen && (
								<DeleteConfirm
									action="discard"
									discardFunc={handleDiscard}
									cancelFunc={handleCloseDelete}
								/>
							)}
							<div className="w-11/12 md:w-11/12 m-auto mt-12 space-y-0 md:space-y-12 max-w-7xl">
								<h1 className="text-center text-3xl md:text-4xl text-darkBlue font-accent font-bold">
									Recipe preview
								</h1>
								<div className="main-section space-y-6 md:space-y-0 md:space-x-5 md:flex">
									<div className="md:w-1/4">
										<Sidebar
											img={recipe.image ? recipe.image : '/missingImage.svg'}
											ingredients={
												recipe.extendedIngredients.length
													? recipe.extendedIngredients.map(
															ingredient => ingredient.original
													  )
													: recipe.ingredients.length
													? recipe.ingredients.map(ingredient => ingredient)
													: ''
											}
										/>
									</div>

									<MainSection
										title={recipe.title}
										servings={recipe.servings}
										time={recipe.readyInMinutes}
										info={recipe.info}
										saved={false}
										openDelete={handleOpenDelete}
										saveRecipe={handleRecipeSave}
										instructions={
											recipe.extendedInstructions.length
												? recipe.extendedInstructions.map(
														instruction => instruction.step
												  )
												: recipe.instructions.length
												? recipe.instructions.map(instruction => instruction)
												: ''
										}
									/>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</>
	);
};

export default ConfirmRecipe;
