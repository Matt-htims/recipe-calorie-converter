import { useState } from 'react';
import { useRouter } from 'next/router';

//	Components
import Day from '../components/week-planner/Day';
import AllRecipeSection from '../components/week-planner/AllRecipeSection';

//	Zustand state
import { weekPlannerState } from '../zustand-state/plannerDayState';

const Planner = () => {
	const router = useRouter();
	//	State
	const [addRecipeOpen, setAddRecipeOpen] = useState(false);

	//	Day state
	const monday = weekPlannerState(s => s.monday);
	const tuesday = weekPlannerState(s => s.tuesday);
	const wednesday = weekPlannerState(s => s.wednesday);
	const thursday = weekPlannerState(s => s.thursday);
	const friday = weekPlannerState(s => s.friday);
	const saturday = weekPlannerState(s => s.saturday);
	const sunday = weekPlannerState(s => s.sunday);
	const addMeal = weekPlannerState(s => s.addMeal);

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
			<div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 p-4 md:gap-6 md:m-4">
				<Day day="Monday" state={monday} openRecipes={handleRecipeOpen} />
				<Day day="Tuesday" state={tuesday} openRecipes={handleRecipeOpen} />
				<Day day="Wednesday" state={wednesday} openRecipes={handleRecipeOpen} />
				<Day day="Thursday" state={thursday} openRecipes={handleRecipeOpen} />
				<Day day="Friday" state={friday} openRecipes={handleRecipeOpen} />
				<Day day="Saturday" state={saturday} openRecipes={handleRecipeOpen} />
				<Day day="Sunday" state={sunday} openRecipes={handleRecipeOpen} />
			</div>
		</div>
	);
};

export default Planner;
