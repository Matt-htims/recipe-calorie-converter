import { useEffect, useState } from 'react';

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

	//	Handlers for delete conirmation
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

									<MainSection
										title={recipe.title}
										servings={recipe.servings}
										time={recipe.readyInMinutes}
										info={recipe.info}
										openDelete={handleOpenDelete}
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
