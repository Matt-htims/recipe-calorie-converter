//	Components
import AddRecipeManual from '../../components/addRecipe/AddRecipeManual';
import AddRecipeSearch from '../../components/addRecipe/AddRecipeSearch';

const NewRecipe = () => {
	return (
		<div className="w-9/12 m-auto mt-12 space-y-12">
			<h1 className="text-center text-4xl text-darkBlue font-accent font-bold">
				Add Recipes
			</h1>
			<div className="bg-white shadow-xl p-12 rounded-2xl">
				<AddRecipeSearch />
				<h4 className="text-center font-main font-normal text-3xl">or</h4>
				<AddRecipeManual />
			</div>
		</div>
	);
};

export default NewRecipe;
