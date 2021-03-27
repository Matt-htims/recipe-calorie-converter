//	Zustand state
import { enteredRecipeStore } from '../../zustand';

const ConfirmRecipe = () => {
	//	Entered Recipe State
	const isLoading = enteredRecipeStore(state => state.isLoading);
	const isError = enteredRecipeStore(state => state.isError);
	const recipe = enteredRecipeStore(state => state.recipe);
	return (
		<>
			{isLoading ? (
				<h1>Loading...</h1>
			) : isError ? (
				<h1>Error</h1>
			) : (
				<div>
					<h1>Recipe preview</h1>
					<div className="left-section">
						<div className="picture">
							<img src={recipe.image} alt="recipe image" />
						</div>
						<div className="ingredients">
							<h3>Ingredients</h3>
							<ul>
								{recipe.extendedIngredients.length
									? recipe.extendedIngredients.map(ingredient => (
											<li>{ingredient.original}</li>
									  ))
									: recipe.ingredients.length
									? recipe.ingredients.map(ingredient => <li>{ingredient}</li>)
									: ''}
							</ul>
						</div>
					</div>
					<div className="right-section">
						<h2>{recipe.title}</h2>
						<div className="recipe-info">
							<div className="servings-time">
								<p>{recipe.servings}</p>
								<p>{`${recipe.readyInMinutes} mins total time`}</p>
							</div>
							<div className="icons">
								<p>icons go here</p>
							</div>
						</div>
						<div className="instructions">
							<h2>Instructions</h2>
							<ol>
								{recipe.extendedInstructions.length
									? recipe.extendedInstructions.map(instruction => (
											<li>{instruction.step}</li>
									  ))
									: recipe.instructions.length
									? recipe.instructions.map(instruction => (
											<li>{instruction}</li>
									  ))
									: ''}
							</ol>
						</div>
						<div className="buttons">
							<div className="discard-button">
								<button>discard recipe</button>
							</div>
							<div className="edit-save">
								<button>edit</button>
								<button>save</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ConfirmRecipe;
