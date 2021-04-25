import { useState, useRef } from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Form } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import { auth } from '../config/firebase';

//	Funcs
import totalNutrients from '../helper-functions/totalNutrients';

// Components
import ErrorBox from '../components/ErrorBox';

// Api requests
import updateOne from '../apiFunctions/updateOne';
import nutritionRequest from '../apiFunctions/nutritionRequest';

const yupValidation = yup.object().shape({
	recipeName: yup.string().required('This field is required'),
	ingredients: yup.string().required('This field is required'),
	servings: yup
		.number()
		.typeError('Must be a number')
		.required('Must include servings'),
	readyInMinutes: yup.number().typeError('Must be a number'),
	instructions: yup.string(),
	imageLink: yup.string(),
});

const EditRecipe = ({ recipe }) => {
	const router = useRouter();
	const { id } = router.query;

	//	State
	const [edamamError, setEdamamError] = useState(false);

	const formRef = useRef();

	const formattedIngredients = recipe.ingredients.join('\n');

	const initialFormState = {
		recipeName: recipe.title,
		ingredients: formattedIngredients,
		servings: recipe.servings,
		readyInMinutes: recipe.readyInMinutes,
		instructions: recipe.instructions.join('\n'),
		image: recipe.image,
		dairyFree: recipe.info.dairyFree,
		glutenFree: recipe.info.glutenFree,
		vegetarian: recipe.info.vegetarian,
		vegan: recipe.info.vegan,
	};

	const handleNoCalRecipeSave = async () => {
		if (auth.currentUser) {
			auth.currentUser
				.getIdToken(/* forceRefresh */ true)
				.then(function (idToken) {
					updateOne(idToken, id, formRef.current.values, false)
						.then(() => router.push('/recipes'))
						.catch(err => console.error(err));
				});
		} else {
			console.log('Not logged in');
		}
	};

	return (
		<>
			<Formik
				initialValues={initialFormState}
				onSubmit={(values, { resetForm }) => {
					const nutritionRecipe = {
						title: values.recipeName,
						ingredients: values.ingredients.split('\n'),
						extendedIngredients: {},
					};
					auth.currentUser
						? auth.currentUser
								.getIdToken(/* forceRefresh */ true)
								.then(function (idToken) {
									if (
										values.servings !== recipe.servings &&
										values.ingredients === formattedIngredients
									) {
										const newNutrients = totalNutrients(
											recipe.calorieInfo,
											recipe.servings,
											values.servings
										);
										console.log(newNutrients);
										values.calorieInfo = newNutrients;
									}
									if (values.ingredients !== formattedIngredients) {
										nutritionRequest(nutritionRecipe)
											.then(data => {
												updateOne(idToken, id, values, true, data)
													.then(() => router.push(`/recipes/${id}`))
													.catch(err => console.log(err));
											})
											.catch(err => {
												console.error(err, 'error');
												setEdamamError(true);
											});
									} else {
										updateOne(idToken, id, values, false)
											.then(() => router.push(`/recipes/${id}`))
											.catch(err => console.log(err));
									}
								})
								.catch(function (error) {
									// Handle error
								})
						: console.log('Not logged in', auth);
				}}
				validationSchema={yupValidation}
				innerRef={formRef}
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
							{edamamError ? (
								<div className="mb-6">
									<ErrorBox save={handleNoCalRecipeSave} />{' '}
								</div>
							) : (
								''
							)}
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
									value={values.readyInMinutes}
									onChange={handleChange}
									onBlur={handleBlur}
									name="readyInMinutes"
									label="Total time (mins)"
									placeholder="25"
									error={
										touched.readyInMinutes &&
										errors.readyInMinutes && {
											content: errors.readyInMinutes,
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
								value={values.image}
								onChange={handleChange}
								onBlur={handleBlur}
								name="image"
								label="Image link"
								placeholder="https://thatlovelyimagewebsite.com/image-2"
								error={
									touched.image &&
									errors.image && {
										content: errors.image,
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
								<Form.Button onClick={handleSubmit} type="submit" primary>
									Save
								</Form.Button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default EditRecipe;
