import EditUnsavedRecipe from '../../components/EditUnsavedRecipe';

const Edit = () => {
	return (
		<div className="w-11/12 md:w-9/12 m-auto mt-12 space-y-0 md:space-y-12 max-w-7xl">
			<h1 className="text-center text-3xl md:text-4xl text-darkBlue font-accent font-bold">
				Edit your recipe before saving
			</h1>
			<div className="bg-white shadow-xl px-5 py-10 md:p-12 rounded-2xl">
				<EditUnsavedRecipe />
			</div>
		</div>
	);
};

export default Edit;
