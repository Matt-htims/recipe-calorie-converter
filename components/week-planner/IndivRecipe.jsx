import React from 'react';

//	Components
import NutritionBox from '../showRecipe/NutritionBox';

const IndivRecipe = ({ calories, day, meal, addMeal, recipe, close }) => {
	const clickHandler = () => {
		addMeal(day, meal, recipe);
		close();
	};

	return (
		<>
			<div
				onClick={clickHandler}
				className="md:flex lg:space-x-6 md:space-x-1 space-x-3 shadow-lg w-full rounded-xl overflow-hidden md:h-64 cursor-pointer"
			>
				<div className="md:w-4/12 md:mx-0 mx-auto flex-none">
					<img
						className="object-cover h-full w-full"
						src={recipe.image}
						alt=""
					/>
				</div>
				<div className="main flex flex-col justify-between md:mt-3 md:mb-4 my-1 pr-1">
					<h4 className="font-sans md:text-left text-center font-normal text-2xl md:py-0 py-3 text-gray-800">
						{recipe.title}
					</h4>
					<div className="calories flex items-center lg:space-x-4 md:space-x-1 md:justify-start justify-center">
						<NutritionBox
							name="Calories"
							amount={recipe.calorieInfo.calories}
							percent={recipe.calorieInfo.totalDailyPercent.calories}
							unit="kcal"
						/>
						<NutritionBox
							name="Carbs"
							amount={recipe.calorieInfo.totalNutrientsGrams.carbs}
							percent={recipe.calorieInfo.totalDailyPercent.carbs}
							unit="g"
						/>
						<NutritionBox
							name="Protein"
							amount={recipe.calorieInfo.totalNutrientsGrams.protein}
							percent={recipe.calorieInfo.totalDailyPercent.protein}
							unit="g"
						/>
						<NutritionBox
							name="Fat"
							amount={recipe.calorieInfo.totalNutrientsGrams.fat}
							percent={recipe.calorieInfo.totalDailyPercent.fat}
							unit="g"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default IndivRecipe;
