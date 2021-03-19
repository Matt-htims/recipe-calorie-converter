import { useState } from 'react';

//	Components
import AddRecipe from '../components/AddRecipe';
import RecipeCalories from '../components/RecipeCalories';
import SearchRecipe from '../components/SearchRecipe';

export default function Home() {
	return (
		<div className="">
			<div className="home flex items-center justify-around h-full ">
				<AddRecipe />
				<RecipeCalories />
			</div>
			<SearchRecipe />
		</div>
	);
}
