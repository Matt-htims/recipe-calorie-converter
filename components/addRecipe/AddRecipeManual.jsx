import { useState, useReducer } from 'react';
import { Form } from 'semantic-ui-react';
import axios from 'axios';

//	Reducers
import manualFormReducer from '../../reducers/manualFormReducer';

const edamamURL = `https://api.edamam.com/api/nutrition-details?app_id=${process.env.NEXT_PUBLIC_EDAMAM_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_KEY}`;

const initialFormState = {
	recipeName: '',
	ingredients: [],
	servings: '',
	totalTime: '',
	instructions: [],
	imageLink: '',
	checkboxes: {
		dairyFree: false,
		glutenFree: false,
		sustainable: false,
		vegetarian: false,
		vegan: false,
	},
};

const AddRecipeManual = ({ recipeDataState, recipeDataDispatch }) => {
	//	State
	const [state, dispatch] = useReducer(manualFormReducer, initialFormState);

	const handleTextChange = e => {
		dispatch({
			type: 'HANDLE_INPUT_TEXT',
			field: e.target.name,
			payload: e.target.value,
		});
	};

	const handleCheckboxChange = (e, data) => {
		dispatch({
			type: 'HANDLE_INPUT_CHECK',
			field: data.value,
			payload: data.checked,
		});
	};

	const handleSubmit = () => {
		const instructions = state.instructions.length
			? state.instructions.split('\n')
			: [];
		const ingredients = state.ingredients.split('\n');
		recipeDataDispatch({
			type: 'SEARCH_DATA_SUCCESS',
			payload: {
				instructions: instructions,
				cookingMinutes: '',
				extendedIngredients: ingredients,
				image: state.imageLink,
				servings: state.servings,
				title: state.recipeName,
				summary: '',
				preparationMinutes: '',
				readyInMinutes: state.totalTime,
				info: {
					vegetarian: state.checkboxes.vegetarian,
					vegan: state.checkboxes.vegan,
					sustainable: state.checkboxes.sustainable,
					veryHealthy: '',
					pricePerServing: '',
					glutenFree: state.checkboxes.glutenFree,
					dairyFree: state.checkboxes.dairyFree,
				},
			},
		});
		dispatch({ type: 'RESET_FORM_STATE' });
	};

	// const submitHandler = async () => {
	// 	const data = await axios({
	// 		method: 'post',
	// 		url: edamamURL,
	// 		data: { title: titleSaved, ingr: ingr },
	// 	});
	// 	setRecipeData(data);
	// };

	const handleStateShow = () => {
		console.log(state);
		console.log(recipeDataState);
	};

	return (
		<div>
			<div className="title ">
				<h3 onClick={handleStateShow}>Enter the recipe manually:</h3>
			</div>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					value={state.recipeName}
					onChange={handleTextChange}
					name="recipeName"
					label="Recipe name"
					placeholder="pizza"
				/>
				<Form.TextArea
					value={state.ingredients}
					onChange={handleTextChange}
					name="ingredients"
					label="Ingredients - enter each ingredient on a new line"
					placeholder="500g tomatoes
2 glugs of oil
6 chickens"
				/>
				<h4>Optional info</h4>
				<Form.Group widths="equal">
					<Form.Input
						fluid
						value={state.servings}
						onChange={handleTextChange}
						name="servings"
						label="Servings"
						placeholder="4"
					/>
					<Form.Input
						fluid
						value={state.totalTime}
						onChange={handleTextChange}
						name="totalTime"
						label="Total time (mins)"
						placeholder="25"
					/>
				</Form.Group>
				<Form.TextArea
					value={state.instructions}
					onChange={handleTextChange}
					name="instructions"
					label="Instructions - enter each step on a new line"
					placeholder="Cut the tomatoes
Oil the pan
Skin the carrots"
				/>
				<Form.Input
					value={state.imageLink}
					onChange={handleTextChange}
					name="imageLink"
					label="Image link"
					placeholder="https://thatlovelyimagewebsite.com/image-2"
				/>
				<Form.Group widths="equal">
					<Form.Checkbox
						fluid
						onChange={handleCheckboxChange}
						checked={state.checkboxes.vegetarian}
						label="Vegetarian"
						value="vegetarian"
					/>
					<Form.Checkbox
						fluid
						onChange={handleCheckboxChange}
						checked={state.checkboxes.vegan}
						label="Vegan"
						value="vegan"
					/>
					<Form.Checkbox
						fluid
						onChange={handleCheckboxChange}
						checked={state.checkboxes.dairyFree}
						label="Dairy free"
						value="dairyFree"
					/>
					<Form.Checkbox
						fluid
						onChange={handleCheckboxChange}
						checked={state.checkboxes.glutenFree}
						label="Gluten free"
						value="glutenFree"
					/>
					<Form.Checkbox
						fluid
						onChange={handleCheckboxChange}
						checked={state.checkboxes.sustainable}
						label="Sustainable"
						value="sustainable"
					/>
					<Form.Button>ADD RECIPE</Form.Button>
				</Form.Group>
			</Form>
		</div>
	);
};

export default AddRecipeManual;
