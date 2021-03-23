import { useReducer } from 'react';

//	Components
import AddRecipeManual from '../../components/addRecipe/AddRecipeManual';
import AddRecipeSearch from '../../components/addRecipe/AddRecipeSearch';

//	Reducers
import recipeDataReducer from '../../reducers/recipeDataReducer';

const NewRecipe = () => {
	const [state, dispatch] = useReducer(recipeDataReducer, {
		isLoading: false,
		isError: false,
		recipe: {},
	});

	return (
		<div className="w-9/12 m-auto">
			<h1 className="text-center text-darkBlue mt-12">Add Recipes</h1>
			<div>
				<AddRecipeSearch
					recipeDataState={state}
					recipeDataDispatch={dispatch}
				/>
			</div>
			<div>
				<AddRecipeManual
					recipeDataState={state}
					recipeDataDispatch={dispatch}
				/>
			</div>
		</div>
	);
};

export default NewRecipe;
