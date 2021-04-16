const RecipeIcons = ({ info }) => {
	return (
		<div className="icons grid grid-cols-2 gap-4">
			{info.vegetarian && (
				<img
					className="w-8 h-8"
					title="Vegetarian"
					src="/vegetarian.svg"
					alt="vegetarian"
				/>
			)}
			{info.vegan && (
				<img className="w-8 h-8" title="Vegan" src="/vegan.svg" alt="vegan" />
			)}
			{info.glutenFree && (
				<img
					className="w-8 h-8"
					title="Gluten free"
					src="/glutenFree.svg"
					alt="Gluten free"
				/>
			)}
			{info.dairyFree && (
				<img
					className="w-8 h-8"
					title="Dairy free"
					src="/dairyFree.svg"
					alt="Dairy free"
				/>
			)}
		</div>
	);
};

export default RecipeIcons;
