

//	Components
import AddRecipeManual from '../../components/addRecipe/AddRecipeManual';
import AddRecipeSearch from '../../components/addRecipe/AddRecipeSearch';

const NewRecipe = () => {
	return (
		<div className="w-9/12 m-auto">
			<h1 className="text-center text-darkBlue mt-12">Add Recipes</h1>
			<div>
				<AddRecipeSearch />
			</div>
			<div>
				<AddRecipeManual />
			</div>
		</div>
	);
};

export default NewRecipe;
