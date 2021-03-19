import React from 'react';
import axios from 'axios';
import { Input, Form, Button } from 'semantic-ui-react';

import { linkRecipeStore, recipeStore } from '../zustand';
const edamamURL = `https://api.edamam.com/api/nutrition-details?app_id=${process.env.NEXT_PUBLIC_EDAMAM_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_KEY}`;

const SearchRecipe = () => {
	//  State
	const recipeURL = linkRecipeStore(state => state.recipeURL);
	const linkRecipeData = linkRecipeStore(state => state.linkRecipeData);
	const formattedData = linkRecipeStore(state => state.formattedData);

	//  State functions
	const updateRecipeURL = linkRecipeStore(state => state.updateRecipeURL);
	const setLinkRecipeData = linkRecipeStore(state => state.setLinkRecipeData);
	const setFormattedData = linkRecipeStore(state => state.setFormattedData);

	const setRecipeData = recipeStore(state => state.setRecipeData);

	//  Handlers
	const submitHandler = async () => {
		const { data } = await axios(
			`https://api.spoonacular.com/recipes/extract?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_KEY}&url=${recipeURL}`
		);
		setLinkRecipeData({
			instructions: data.analyzedInstructions[0].steps,
			cookingMinutes: data.cookingMinutes,
			extendedIngredients: data.extendedIngredients,
			image: data.image,
			servings: data.servings,
			title: data.title,
			summary: data.summary,
			preparationMinutes: data.preparationMinutes,
			readyInMinutes: data.readyInMinutes,
			info: {
				vegetarian: data.vegetarian,
				vegan: data.vegan,
				sustainable: data.sustainable,
				veryHealthy: data.veryHealthy,
				pricePerServing: data.pricePerServing,
				glutenFree: data.glutenFree,
				dairyFree: data.dairyFree,
			},
		});
		setFormattedData({
			ingr: data.extendedIngredients.map(ingredient => ingredient.original),
			title: data.title,
			yield: data.servings,
		});
		updateRecipeURL('');
	};

	const getCaloriesHandler = async () => {
		const data = await axios({
			method: 'post',
			url: edamamURL,
			data: formattedData,
		});
		setRecipeData(data);
	};

	const showHandler = () => {
		console.log(linkRecipeData);
		console.log(formattedData);
	};

	return (
		<div>
			<h1>Search here</h1>
			<Form onSubmit={submitHandler}>
				<Form.Field>
					<Input
						onChange={e => updateRecipeURL(e.target.value)}
						value={recipeURL}
						icon="search"
						placeholder="Search..."
					></Input>
				</Form.Field>
				<Button type="submit">Search</Button>
			</Form>
			<div onClick={showHandler} className="">
				show recipe data
				<div className="">
					<ul>
						{linkRecipeData.ingredients &&
							linkRecipeData.ingredients.map(ingredient => (
								<li>{ingredient}</li>
							))}
					</ul>
					<img src={linkRecipeData.image && linkRecipeData.image} alt="" />
				</div>
			</div>
			<Button onClick={getCaloriesHandler}>Analyse</Button>
		</div>
	);
};

export default SearchRecipe;
