import { useAuth } from '../../hooks/useAuth';

//	Components
import AddRecipeSearch from '../../components/addRecipe/AddRecipeSearch';
import AddRecipeManual from '../../components/addRecipe/AddRecipeManual';
import NotLogged from '../../components/NotLogged';

const NewRecipe = () => {
	const { user } = useAuth();
	if (!user) return <NotLogged />;
	return (
		<div className="w-11/12 md:w-9/12 m-auto mt-12 space-y-0 md:space-y-12 max-w-7xl">
			<h1 className="text-center text-3xl md:text-4xl text-darkBlue font-accent font-bold">
				Add Recipes
			</h1>
			<div className="bg-white shadow-xl px-5 py-10 md:p-12 rounded-2xl">
				<AddRecipeSearch />
				<h4 className="text-center font-sans font-normal text-xl md:text-3xl">
					or
				</h4>
				<AddRecipeManual />
			</div>
		</div>
	);
};

export default NewRecipe;
