import { useState } from 'react';
import axios from 'axios';
import { Input, Form, Button } from 'semantic-ui-react';

import { linkRecipeStore, recipeStore } from '../../zustand';
const edamamURL = `https://api.edamam.com/api/nutrition-details?app_id=${process.env.NEXT_PUBLIC_EDAMAM_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_KEY}`;

const AddRecipeSearch = ({ recipeDataState, recipeDataDispatch }) => {
	//  State
	const [recipeURL, setRecipeURL] = useState('');

	//  Handlers
	const submitHandler = async () => {
		recipeDataDispatch({ type: 'SEARCH_DATA_REQUEST' });
		axios(
			`https://api.spoonacular.com/recipes/extract?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_KEY}&url=${recipeURL}`
		)
			.then(response => {
				const { data } = response;
				recipeDataDispatch({
					type: 'SEARCH_DATA_SUCCESS',
					payload: {
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
					},
				});
			})
			.catch(err => {
				recipeDataDispatch({ type: 'SEARCH_DATA_FAILURE' });
				if (err.response) {
					//	Client received an error resonse (5xx, 4xx)
				} else if (err.request) {
					//	Client never received a response, or request never left
				} else {
					//	Anything else
				}
			});
		setRecipeURL('');
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
		console.log(searchDataState);
	};

	return (
		<div>
			<h1>Search here</h1>
			<Form onSubmit={submitHandler}>
				<Form.Field>
					<Input
						onChange={e => setRecipeURL(e.target.value)}
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
						{recipeDataState.recipe.ingredients &&
							recipeDataState.recipe.ingredients.map(ingredient => (
								<li>{ingredient}</li>
							))}
					</ul>
					<img
						src={recipeDataState.recipe.image && recipeDataState.recipe.image}
						alt=""
					/>
				</div>
			</div>
			<Button onClick={getCaloriesHandler}>Analyse</Button>
		</div>
	);
};

export default AddRecipeSearch;
