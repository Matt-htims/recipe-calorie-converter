import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import getPercentage from '../helper-functions/getPercentage';

//	Components
import Day from '../components/week-planner/Day';
import AllRecipeSection from '../components/week-planner/AllRecipeSection';
import NutritionBox from '../components/showRecipe/NutritionBox';

//	Zustand state
import { weekPlannerState } from '../zustand-state/plannerDayState';

const Planner = () => {
	const router = useRouter();
	//	State
	const [addRecipeOpen, setAddRecipeOpen] = useState(false);
	const [weeklyNut, setWeeklyNut] = useState({
		Monday: { cals: 0, carbs: 0, prot: 0, fat: 0 },
		Tuesday: { cals: 0, carbs: 0, prot: 0, fat: 0 },
		Wednesday: { cals: 0, carbs: 0, prot: 0, fat: 0 },
		Thursday: { cals: 0, carbs: 0, prot: 0, fat: 0 },
		Friday: { cals: 0, carbs: 0, prot: 0, fat: 0 },
		Saturday: { cals: 0, carbs: 0, prot: 0, fat: 0 },
		Sunday: { cals: 0, carbs: 0, prot: 0, fat: 0 },
	});
	const [totalWeeklyNut, setTotalWeeklyNut] = useState({
		cals: 0,
		carbs: 0,
		prot: 0,
		fat: 0,
	});

	//	Day state
	const monday = weekPlannerState(s => s.monday);
	const tuesday = weekPlannerState(s => s.tuesday);
	const wednesday = weekPlannerState(s => s.wednesday);
	const thursday = weekPlannerState(s => s.thursday);
	const friday = weekPlannerState(s => s.friday);
	const saturday = weekPlannerState(s => s.saturday);
	const sunday = weekPlannerState(s => s.sunday);
	const addMeal = weekPlannerState(s => s.addMeal);
	const resetAll = weekPlannerState(s => s.resetAll);

	useEffect(() => {
		let cals = 0;
		let carbs = 0;
		let fat = 0;
		let prot = 0;

		for (let day of Object.entries(weeklyNut)) {
			cals += day[1].cals;
			carbs += day[1].carbs;
			fat += day[1].fat;
			prot += day[1].prot;
		}

		setTotalWeeklyNut({ cals, carbs, fat, prot });
	}, [weeklyNut]);

	//	Handlers
	const handleRecipeOpen = () => {
		setAddRecipeOpen(true);
	};
	const handleRecipeClose = () => {
		router.push('/planner');
		setAddRecipeOpen(false);
	};

	return (
		<div className="min-h-screen relative">
			{addRecipeOpen ? (
				<AllRecipeSection close={handleRecipeClose} addMeal={addMeal} />
			) : (
				''
			)}
			<div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 p-4 md:gap-6 md:m-4 gap-3">
				<Day
					day="Monday"
					state={monday}
					openRecipes={handleRecipeOpen}
					setWeekNutState={setWeeklyNut}
				/>
				<Day
					day="Tuesday"
					state={tuesday}
					openRecipes={handleRecipeOpen}
					setWeekNutState={setWeeklyNut}
				/>
				<Day
					day="Wednesday"
					state={wednesday}
					openRecipes={handleRecipeOpen}
					setWeekNutState={setWeeklyNut}
				/>
				<Day
					day="Thursday"
					state={thursday}
					openRecipes={handleRecipeOpen}
					setWeekNutState={setWeeklyNut}
				/>
				<Day
					day="Friday"
					state={friday}
					openRecipes={handleRecipeOpen}
					setWeekNutState={setWeeklyNut}
				/>
				<Day
					day="Saturday"
					state={saturday}
					openRecipes={handleRecipeOpen}
					setWeekNutState={setWeeklyNut}
				/>
				<Day
					day="Sunday"
					state={sunday}
					openRecipes={handleRecipeOpen}
					setWeekNutState={setWeeklyNut}
				/>
				<div className="p-4 bg-white rounded-2xl shadow-lg space-y-16">
					<h1 className="text-center font-accent font-normal text-3xl">
						Weekly Summary
					</h1>

					<div className="flex justify-center">
						<NutritionBox
							name="Calories"
							amount={totalWeeklyNut.cals}
							percent={getPercentage(totalWeeklyNut.cals, 14000)}
							unit="kcal"
							day={true}
						/>
						<NutritionBox
							name="Carbs"
							amount={totalWeeklyNut.carbs}
							percent={getPercentage(totalWeeklyNut.carbs, 2800)}
							unit="g"
							day={true}
						/>
						<NutritionBox
							name="Protein"
							amount={totalWeeklyNut.prot}
							percent={getPercentage(totalWeeklyNut.prot, 840)}
							unit="g"
							day={true}
						/>
						<NutritionBox
							name="Fat"
							amount={totalWeeklyNut.fat}
							percent={getPercentage(totalWeeklyNut.fat, 2100)}
							unit="g"
							day={true}
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-center">
				<button
					className="bg-white font-accent font-base text-base border border-gray-700 rounded-md py-3 px-4 hover:bg-darkBlue hover:text-white "
					onClick={() => {
						resetAll();
					}}
				>
					Reset all
				</button>
			</div>
		</div>
	);
};

export default Planner;
