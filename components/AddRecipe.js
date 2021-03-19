import { useState } from 'react';
import { Input, Button, Form } from 'semantic-ui-react';
import axios from 'axios';

//	Global state
import { recipeStore } from '../zustand';

const edamamURL = `https://api.edamam.com/api/nutrition-details?app_id=${process.env.NEXT_PUBLIC_EDAMAM_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_KEY}`;

const AddRecipeForm = () => {
	//	State
	const title = recipeStore(state => state.title);
	const indivIngredient = recipeStore(state => state.indivIngredient);

	const titleSaved = recipeStore(state => state.titleSaved);
	const ingr = recipeStore(state => state.ingr);

	//	State functions
	const updateTitle = recipeStore(state => state.updateTitle);
	const updateIndivIngredient = recipeStore(
		state => state.updateIndivIngredient
	);
	const updateIngr = recipeStore(state => state.updateIngr);
	const setRecipeTitle = recipeStore(state => state.setRecipeTitle);
	const resetRecipeState = recipeStore(state => state.resetRecipeState);

	const setRecipeData = recipeStore(state => state.setRecipeData);

	const submitHandler = async () => {
		const data = await axios({
			method: 'post',
			url: edamamURL,
			data: { title: titleSaved, ingr: ingr },
		});
		setRecipeData(data);
	};

	return (
		<div>
			<div className="home-container w-9/12">
				<h1 className="text-center">Calculate recipe calories</h1>
				<div className="flex justify-around">
					<div className="search flex flex-col">
						<Form onSubmit={() => setRecipeTitle(title)}>
							<Form.Field>
								<label>Recipe name</label>
								<Input
									placeholder="Recipe name"
									value={title}
									onChange={e => updateTitle(e.target.value)}
								/>
							</Form.Field>
							<Button>Add Title to recipe</Button>
						</Form>
						<Form onSubmit={() => updateIngr(indivIngredient)}>
							<Form.Field>
								<label>Ingredients</label>
								<Input
									placeholder="Recipe items"
									value={indivIngredient}
									onChange={e => updateIndivIngredient(e.target.value)}
								/>
							</Form.Field>
							<Button type="submit">Add Ingredient to recipe</Button>
						</Form>
					</div>
					<div className="output">
						<h3>Recipe name</h3>
						<p>{titleSaved}</p>
						<h3>Ingredients</h3>
						<ul>
							{ingr.map((ingr, index) => (
								<li key={index}>{ingr}</li>
							))}
						</ul>
						<Button onClick={resetRecipeState}>Reset</Button>
					</div>
				</div>
			</div>
			<Button className="w-min" onClick={submitHandler}>
				Submit
			</Button>
		</div>
	);
};

export default AddRecipeForm;
