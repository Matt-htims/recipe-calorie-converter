import { useState } from "react";
import axios from "axios";
import { Input, Form, Button } from "semantic-ui-react";
import { useRouter } from "next/router";

//	Zustand state
import { enteredRecipeStore } from "../../zustand";

const edamamURL = `https://api.edamam.com/api/nutrition-details?app_id=${process.env.NEXT_PUBLIC_EDAMAM_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_KEY}`;

const AddRecipeSearch = () => {
	const router = useRouter();
	//  State
	const [recipeURL, setRecipeURL] = useState("");

	//	New Recipe state
	const actions = enteredRecipeStore(s => s.actions);

	//  Handlers
	const submitHandler = async () => {
		actions.searchDataRequest();
		axios(
			`https://api.spoonacular.com/recipes/extract?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_KEY}&url=${recipeURL}`
		)
			.then(response => {
				const { data } = response;
				const searchRecipe = {
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
				};
				actions.searchDataSuccess(searchRecipe);
				setRecipeURL("");
				router.push("/recipes/confirm");
			})
			.catch(err => {
				actions.searchDataFailure();
				if (err.response) {
					//	Client received an error resonse (5xx, 4xx)
				} else if (err.request) {
					//	Client never received a response, or request never left
				} else {
					//	Anything else
				}
			});
	};

	const getCaloriesHandler = async () => {
		const data = await axios({
			method: "post",
			url: edamamURL,
			data: formattedData,
		});
		setRecipeData(data);
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
		</div>
	);
};

export default AddRecipeSearch;
