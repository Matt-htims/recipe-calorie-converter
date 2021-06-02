import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//	Helper functions
import getPercentage from '../../helper-functions/getPercentage';

//	Components
import Meal from './Meal';
import NutritionBox from '../showRecipe/NutritionBox';

const Day = ({ day, openRecipes, state, weekNutState, setWeekNutState }) => {
	const router = useRouter();

	//	State
	const [totalCal, setTotalCal] = useState(0);
	const [totalCarb, setTotalCarb] = useState(0);
	const [totalProt, setTotalProt] = useState(0);
	const [totalFat, setTotalFat] = useState(0);

	//	Handlers
	const handleOpenRecipes = meal => {
		router.push({
			pathname: '/planner',
			query: { day: day.toLowerCase(), meal },
		});
		openRecipes();
	};

	useEffect(() => {
		let cals = 0;
		let carbs = 0;
		let fats = 0;
		let prots = 0;

		for (let meal of state.breakfast) {
			if (meal.calorieInfo) {
				cals += meal.calorieInfo.calories;
				carbs += meal.calorieInfo.totalNutrientsGrams.carbs;
				fats += meal.calorieInfo.totalNutrientsGrams.fat;
				prots += meal.calorieInfo.totalNutrientsGrams.protein;
			}
		}
		for (let meal of state.lunch) {
			if (meal.calorieInfo) {
				cals += meal.calorieInfo.calories;
				carbs += meal.calorieInfo.totalNutrientsGrams.carbs;
				fats += meal.calorieInfo.totalNutrientsGrams.fat;
				prots += meal.calorieInfo.totalNutrientsGrams.protein;
			}
		}
		for (let meal of state.dinner) {
			if (meal.calorieInfo) {
				cals += meal.calorieInfo.calories;
				carbs += meal.calorieInfo.totalNutrientsGrams.carbs;
				fats += meal.calorieInfo.totalNutrientsGrams.fat;
				prots += meal.calorieInfo.totalNutrientsGrams.protein;
			}
		}
		for (let meal of state.snack) {
			if (meal.calorieInfo) {
				cals += meal.calorieInfo.calories;
				carbs += meal.calorieInfo.totalNutrientsGrams.carbs;
				fats += meal.calorieInfo.totalNutrientsGrams.fat;
				prots += meal.calorieInfo.totalNutrientsGrams.protein;
			}
		}

		setTotalCal(cals);
		setTotalCarb(carbs);
		setTotalProt(prots);
		setTotalFat(fats);
	}, [state]);

	useEffect(() => {
		setWeekNutState({
			...weekNutState,
			[day]: {
				cals: totalCal,
				carbs: totalCarb,
				prot: totalProt,
				fat: totalFat,
			},
		});
	}, [totalCal, totalCarb, totalProt, totalFat]);

	return (
		<div className="p-4 space-y-5 bg-white rounded-2xl shadow-lg">
			<h1
				onClick={() => console.log(state)}
				className="text-center font-accent font-normal text-3xl"
			>
				{day}
			</h1>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<div className="flex justify-between items-center mb-2">
						<h3 className="m-0 font-sans font-medium text-2xl">Breakfast</h3>
						<p
							className="py-1 px-3 rounded-full cursor-pointer text-3xl font-light font-accent hover:bg-darkBlue hover:text-white"
							onClick={() => handleOpenRecipes('breakfast')}
						>
							+
						</p>
					</div>
					<Meal
						recipes={state.breakfast}
						day={day.toLowerCase()}
						meal="breakfast"
					/>
				</div>
				<div>
					<div className="flex justify-between items-center mb-2">
						<h3 className="m-0 font-sans font-medium text-2xl">Lunch</h3>
						<p
							className="py-1 px-3 rounded-full cursor-pointer text-3xl font-light font-accent hover:bg-darkBlue hover:text-white"
							onClick={() => handleOpenRecipes('lunch')}
						>
							+
						</p>
					</div>
					<Meal recipes={state.lunch} day={day.toLowerCase()} meal="lunch" />
				</div>
				<div>
					<div className="flex justify-between items-center mb-2">
						<h3 className="m-0 font-sans font-medium text-2xl">Dinner</h3>
						<p
							className="py-1 px-3 rounded-full cursor-pointer text-3xl font-light font-accent hover:bg-darkBlue hover:text-white"
							onClick={() => handleOpenRecipes('dinner')}
						>
							+
						</p>
					</div>
					<Meal recipes={state.dinner} day={day.toLowerCase()} meal="dinner" />
				</div>
				<div>
					<div className="flex justify-between items-center mb-2">
						<h3 className="m-0 font-sans font-medium text-2xl">Snack</h3>
						<p
							className="py-1 px-3 rounded-full cursor-pointer text-3xl font-light font-accent hover:bg-darkBlue hover:text-white"
							onClick={() => handleOpenRecipes('snack')}
						>
							+
						</p>
					</div>
					<Meal recipes={state.snack} day={day.toLowerCase()} meal="snack" />
				</div>
			</div>

			{/* DO NOT JUST HARD CODE THESE NUMBERS - WOULD BE BEST IF THE USER COULD INPUT ON THEIR ACCOUNT THE CALORIES AND MACROS THEY WANT TO BE HITTING */}

			<div className="flex justify-center">
				<NutritionBox
					name="Calories"
					amount={totalCal}
					percent={getPercentage(totalCal, 2000)}
					unit="kcal"
					day={true}
				/>
				<NutritionBox
					name="Carbs"
					amount={totalCarb}
					percent={getPercentage(totalCarb, 400)}
					unit="g"
					day={true}
				/>
				<NutritionBox
					name="Protein"
					amount={totalProt}
					percent={getPercentage(totalProt, 120)}
					unit="g"
					day={true}
				/>
				<NutritionBox
					name="Fat"
					amount={totalFat}
					percent={getPercentage(totalFat, 300)}
					unit="g"
					day={true}
				/>
			</div>
		</div>
	);
};

export default Day;
