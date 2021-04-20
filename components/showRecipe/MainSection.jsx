import { Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';

//	Components
import NutritionBox from './NutritionBox';
import RecipeIcons from './RecipeIcons';

const MainSection = ({
	title,
	servings,
	time,
	instructions,
	nutrition,
	info,
	openDelete,
	saveRecipe,
	saved,
}) => {
	const router = useRouter();
	const { id } = router.query;

	const handleEdit = () => {
		router.push(`/recipes/${id}/edit`);
	};

	const handleUnsavedEdit = () => {
		router.push('/recipes/edit');
	};
	return (
		<div className="md:w-3/4">
			<div className="bg-white shadow-xl px-5 py-10 md:p-7 rounded-2xl  space-y-8">
				<h2 className="text-center font-sans font-medium text-3xl">{title}</h2>
				{nutrition && (
					<div>
						<div className="nutrition flex justify-between max-w-lg m-auto">
							<NutritionBox
								name="Calories"
								amount={nutrition.calories}
								percent={nutrition.totalDailyPercent.calories}
								unit="kcal"
							/>
							<NutritionBox
								name="Carbs"
								amount={nutrition.totalNutrientsGrams.carbs}
								percent={nutrition.totalDailyPercent.carbs}
								unit="g"
							/>
							<NutritionBox
								name="Protein"
								amount={nutrition.totalNutrientsGrams.protein}
								percent={nutrition.totalDailyPercent.protein}
								unit="g"
							/>
							<NutritionBox
								name="Fat"
								amount={nutrition.totalNutrientsGrams.fat}
								percent={nutrition.totalDailyPercent.fat}
								unit="g"
							/>
						</div>
						<p className="text-sm text-gray-500 pt-3 text-center">
							Nutrition per serving
						</p>
					</div>
				)}
				<div className="md:ml-11 md:mr-11">
					<div className="info flex justify-between">
						<div className="servings-time text-lg">
							<p>{`${servings} servings`}</p>
							<p>{`${time} mins total time`}</p>
						</div>
						<RecipeIcons info={info} />
					</div>
				</div>
				<div className="instructions space-y-8">
					{instructions && (
						<>
							<h3 className="font-sans font-medium text-xl pb-2 md:ml-11">
								Instructions
							</h3>
							<div className="space-y-7">
								{instructions.map((instruction, index) => (
									<div key={`instruction-${index}`} className="flex">
										<div className="w-3">
											<p>{`${index + 1}.`}</p>
										</div>
										<p className="pl-8">{instruction}</p>
									</div>
								))}
							</div>
						</>
					)}
				</div>
				<>
					{saved ? (
						<div className="buttons flex justify-end space-x-4 md:mr-2">
							<div className="delete">
								<Button onClick={openDelete} basic>
									DELETE
								</Button>
							</div>
							<div className="edit">
								<Button onClick={handleEdit} primary>
									EDIT
								</Button>
							</div>
						</div>
					) : (
						<div className="buttons flex justify-between md:ml-11 md:mr-11">
							<div className="discard">
								<Button onClick={openDelete} basic>
									DISCARD
								</Button>
							</div>
							<div className="edit-save flex md:block md:space-x-4">
								<Button onClick={handleUnsavedEdit} secondary>
									EDIT
								</Button>
								<Button onClick={saveRecipe} primary>
									SAVE
								</Button>
							</div>
						</div>
					)}
				</>
			</div>
		</div>
	);
};

export default MainSection;
