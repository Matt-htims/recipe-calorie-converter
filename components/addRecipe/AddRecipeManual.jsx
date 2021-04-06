import React from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Form } from 'semantic-ui-react';
import { useRouter } from 'next/router';

//	Zustand state
import { enteredRecipeStore } from '../../zustand';

const initialFormState = {
	recipeName: '',
	ingredients: '',
	servings: '',
	totalTime: '',
	instructions: '',
	imageLink: '',
	dairyFree: false,
	glutenFree: false,
	vegetarian: false,
	vegan: false,
};

const yupValidation = yup.object().shape({
	recipeName: yup.string().required('This field is required'),
	ingredients: yup.string().required('This field is required'),
	servings: yup.number().typeError('Must be a number'),
	totalTime: yup.number().typeError('Must be a number'),
	instructions: yup.string(),
	imageLink: yup.string(),
});

const AddRecipeManual = () => {
	const router = useRouter();

	//	New Recipe state
	const actions = enteredRecipeStore(s => s.actions);
	const zustandState = enteredRecipeStore();

	return (
		<>
			<Formik
				initialValues={initialFormState}
				onSubmit={(values, { resetForm }) => {
					console.log(values);
					actions.searchDataRequest();
					const instructions = values.instructions.length
						? values.instructions.split('\n')
						: [];
					const ingredients = values.ingredients.split('\n');
					const manuallyAddedRecipe = {
						populated: true,
						instructions: instructions,
						extendedInstructions: [],
						cookingMinutes: '',
						extendedIngredients: [],
						ingredients,
						image: values.imageLink,
						servings: values.servings,
						title: values.recipeName,
						summary: '',
						preparationMinutes: '',
						readyInMinutes: values.totalTime,
						info: {
							vegetarian: values.vegetarian ? true : false,
							vegan: values.vegan ? true : false,
							sustainable: '',
							veryHealthy: '',
							pricePerServing: '',
							glutenFree: values.glutenFree ? true : false,
							dairyFree: values.dairyFree ? true : false,
						},
					};
					actions.searchDataSuccess(manuallyAddedRecipe);
					router.push('/recipes/confirm');
					resetForm();
				}}
				validationSchema={yupValidation}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
				}) => {
					return (
						<Form>
							<Form.Input
								label="Recipe name"
								placeholder="Pizza"
								onChange={handleChange}
								onBlur={handleBlur}
								name="recipeName"
								value={values.recipeName}
								error={
									touched.recipeName &&
									errors.recipeName && {
										content: errors.recipeName,
										pointing: 'above',
									}
								}
							/>

							<Form.TextArea
								label="Ingredients - enter each ingredient on a new line"
								placeholder="500g tomatoes
2 glugs of oil
6 chickens"
								onChange={handleChange}
								onBlur={handleBlur}
								name="ingredients"
								value={values.ingredients}
								error={
									touched.ingredients &&
									errors.ingredients && {
										content: errors.ingredients,
										pointing: 'above',
									}
								}
							/>

							<h4 className="font-sans font-medium text-xl">Optional info</h4>
							<Form.Group widths="equal">
								<Form.Input
									fluid
									value={values.servings}
									onChange={handleChange}
									onBlur={handleBlur}
									name="servings"
									label="Servings"
									placeholder="4"
									error={
										touched.servings &&
										errors.servings && {
											content: errors.servings,
											pointing: 'above',
										}
									}
								/>

								<Form.Input
									fluid
									value={values.totalTime}
									onChange={handleChange}
									onBlur={handleBlur}
									name="totalTime"
									label="Total time (mins)"
									placeholder="25"
									error={
										touched.totalTime &&
										errors.totalTime && {
											content: errors.totalTime,
											pointing: 'above',
										}
									}
								/>
							</Form.Group>
							<Form.TextArea
								value={values.instructions}
								onChange={handleChange}
								onBlur={handleBlur}
								name="instructions"
								label="Instructions - enter each step on a new line"
								placeholder="Cut the tomatoes
Oil the pan
Skin the carrots"
								error={
									touched.instructions &&
									errors.instructions && {
										content: errors.instructions,
										pointing: 'above',
									}
								}
							/>

							<Form.Input
								value={values.imageLink}
								onChange={handleChange}
								onBlur={handleBlur}
								name="imageLink"
								label="Image link"
								placeholder="https://thatlovelyimagewebsite.com/image-2"
								error={
									touched.imageLink &&
									errors.imageLink && {
										content: errors.imageLink,
										pointing: 'above',
									}
								}
							/>

							<div className="checkboxes md:flex justify-between">
								<label className="flex items-center cursor-pointer">
									<div className="field pr-2 pt-1">
										<Field
											type="checkbox"
											name="vegetarian"
											value="vegetarian"
											checked={values.vegetarian}
										/>
									</div>
									Vegetarian
								</label>
								<label className="flex items-center cursor-pointer">
									<div className="field pr-2 pt-1">
										<Field
											type="checkbox"
											checked={values.vegan}
											name="vegan"
											value="vegan"
										/>
									</div>
									Vegan
								</label>
								<label className="flex items-center cursor-pointer">
									<div className="field pr-2 pt-1">
										<Field
											type="checkbox"
											checked={values.dairyFree}
											name="dairyFree"
											value="dairyFree"
										/>
									</div>
									Dairy free
								</label>
								<label className="flex items-center cursor-pointer">
									<div className="field pr-2 pt-1">
										<Field
											type="checkbox"
											name="glutenFree"
											value="glutenFree"
											checked={values.glutenFree}
										/>
									</div>
									Gluten free
								</label>
							</div>

							<div className="flex justify-center mt-14">
								<Form.Button onClick={handleSubmit} type="submit" color="vk">
									Add
								</Form.Button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default AddRecipeManual;
