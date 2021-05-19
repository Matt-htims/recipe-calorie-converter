import React from 'react';

//  Components
import IndivRecipe from './IndivRecipe';
import IndivRecipeShort from './IndivRecipeShort';

const Meal = ({ recipes, day, meal }) => {
	return (
		<div>
			{recipes.map(recipe => (
				<IndivRecipeShort
					key={recipe.id}
					title={recipe.title}
					id={recipe.id}
					image={recipe.image}
					day={day}
					meal={meal}
				/>
			))}
		</div>
	);
};

export default Meal;
