import { useState } from 'react';
import axios from 'axios';
import { Input, Form, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';

//	Zustand state
import { enteredRecipeStore } from '../../zustand';

const AddRecipeSearch = () => {
	const router = useRouter();
	//  State
	const [recipeURL, setRecipeURL] = useState('');
	const [error, setError] = useState(null);

	//	New Recipe state
	const actions = enteredRecipeStore(s => s.actions);

	//  Handlers
	const submitHandler = async () => {
		if (recipeURL) {
			actions.searchDataRequest();
			axios(
				`https://api.spoonacular.com/recipes/extract?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_KEY}&url=${recipeURL}`
			)
				.then(response => {
					const { data } = response;

					const searchRecipe = {
						populated: true,
						instructions: [],
						extendedInstructions: data.analyzedInstructions[0].steps,
						cookingMinutes: data.cookingMinutes,
						extendedIngredients: data.extendedIngredients,
						image: data.image,
						servings: data.servings,
						title: data.title,
						summary: data.summary,
						preparationMinutes: data.preparationMinutes,
						readyInMinutes: data.readyInMinutes,
						originalUrl: data.sourceUrl,
						info: {
							vegetarian: data.vegetarian,
							vegan: data.vegan,
							sustainable: data.sustainable,
							veryHealthy: data.veryHealthy,
							pricePerServing: data.pricePerServing,
							glutenFree: data.glutenFree,
							dairyFree: data.dairyFree,
						},
					};
					actions.searchDataSuccess(searchRecipe);
					setRecipeURL('');
					setError(null);
					router.push('/recipes/confirm');
				})
				.catch(err => {
					actions.searchDataFailure();
					if (err.response) {
						//	Client received an error resonse (5xx, 4xx)
						console.log(err);
						setError('That link did not work, please try again');
					} else if (err.request) {
						//	Client never received a response, or request never left
						console.log(err);
						setError('That link did not work, please try again');
					} else {
						//	Anything else
						console.log(err);
						setError('That link did not work, please try again');
					}
				});
		} else {
			console.log('No URL');
		}
	};

	return (
		<div>
			<h2 className="font-sans font-medium text-xl md:text-3xl">
				Paste the link to a recipe and we'll add it for you!
			</h2>
			<div className="w-6/12"></div>
			<Form onSubmit={submitHandler}>
				<Form.Input
					onChange={e => setRecipeURL(e.target.value)}
					value={recipeURL}
					placeholder="Recipe url..."
					action={{
						content: 'Add',
						color: 'blue',
					}}
					error={error && { content: error, pointing: 'above' }}
				></Form.Input>
			</Form>
		</div>
	);
};

export default AddRecipeSearch;
