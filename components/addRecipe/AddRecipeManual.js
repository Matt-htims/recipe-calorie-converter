import { useState, useReducer } from 'react';
import { Form } from 'semantic-ui-react';
import axios from 'axios';

//	Global state
import { recipeStore } from '../../zustand';

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

const manualFormReducer = (state, action) => {
	switch (action.type) {
		case 'HANDLE_INPUT_TEXT':
			return {
				...state,
				[action.field]: action.payload,
			};
		case 'HANDLE_INPUT_CHECK':
			return {
				...state,
				checkboxes: { ...state.checkboxes, [action.field]: true },
			};
		default:
			return state;
	}
};

const AddRecipeManual = () => {
	// //	State
	// const title = recipeStore(state => state.title);
	// const indivIngredient = recipeStore(state => state.indivIngredient);

	// const titleSaved = recipeStore(state => state.titleSaved);
	// const ingr = recipeStore(state => state.ingr);

	// //	State functions
	// const updateTitle = recipeStore(state => state.updateTitle);
	// const updateIndivIngredient = recipeStore(
	// 	state => state.updateIndivIngredient
	// );
	// const updateIngr = recipeStore(state => state.updateIngr);
	// const setRecipeTitle = recipeStore(state => state.setRecipeTitle);
	// const resetRecipeState = recipeStore(state => state.resetRecipeState);

	// const setRecipeData = recipeStore(state => state.setRecipeData);

	//	State
	const [state, dispatch] = useReducer(manualFormReducer, initialFormState);

	const handleTextChange = e => {
		dispatch({
			type: 'HANDLE_INPUT_TEXT',
			field: e.target.name,
			payload: e.target.value,
		});
	};

	const handleCheckboxChange = e => {
		console.log(e);
		// dispatch({
		// 	type: 'HANDLE_INPUT_CHECK',
		// 	field: e.target.name,
		// 	payload: e.target.value,
		// });
	};

	const submitHandler = async () => {
		const data = await axios({
			method: 'post',
			url: edamamURL,
			data: { title: titleSaved, ingr: ingr },
		});
		setRecipeData(data);
	};

	const handleStateShow = () => {
		console.log(state);
	};

	return (
		<div>
			<div className="title ">
				<h3 onClick={handleStateShow}>Enter the recipe manually:</h3>
			</div>
			<Form>
				<Form.Input
					fluid
					onChange={handleTextChange}
					name="recipeName"
					label="Recipe name"
					placeholder="pizza"
				/>
				<Form.TextArea
					onChange={handleTextChange}
					name="ingredients"
					label="Ingredients - enter each ingredient on a new line"
					placeholder="500g tomatoes,
2 glugs of oil,
6 chickens"
				/>
				<h4>Optional info</h4>
				<Form.Group widths="equal">
					<Form.Input
						onChange={handleTextChange}
						name="servings"
						fluid
						label="Servings"
						placeholder="4"
					/>
					<Form.Input
						onChange={handleTextChange}
						name="totalTime"
						fluid
						label="Total time (mins)"
						placeholder="25"
					/>
				</Form.Group>
				<Form.TextArea
					onChange={handleTextChange}
					name="instructions"
					label="Instructions - enter each step on a new line"
					placeholder="Cut the tomatoes,
Oil the pan,
Skin the carrots"
				/>
				<Form.Input
					onChange={handleTextChange}
					name="imageLink"
					label="Image link"
					placeholder="https://thatlovelyimagewebsite.com/image-2"
				/>
				<Form.Group widths="equal">
					<Form.Checkbox
						onChange={handleCheckboxChange}
						fluid
						label="Vegetarian"
						value="vegetarian"
					/>
					<Form.Checkbox fluid label="Vegan" value="vegan" />
					<Form.Checkbox fluid label="Dairy free" value="dairyFree" />
					<Form.Checkbox fluid label="Gluten free" value="glutenFree" />
					<Form.Checkbox fluid label="Sustainable" value="sustainable" />
				</Form.Group>
				<Form.Button>ADD RECIPE</Form.Button>
			</Form>
		</div>
	);
};

export default AddRecipeManual;
