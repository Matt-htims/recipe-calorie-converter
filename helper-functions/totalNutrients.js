const totalNutrients = (nut, servings, newServings) => {
	return {
		calories: Math.round((nut.calories * servings) / newServings),
		totalDailyPercent: {
			carbs: Math.round((nut.totalDailyPercent.carbs * servings) / newServings),
			calories: Math.round(
				(nut.totalDailyPercent.calories * servings) / newServings
			),
			fat: Math.round((nut.totalDailyPercent.fat * servings) / newServings),
			protein: Math.round(
				(nut.totalDailyPercent.protein * servings) / newServings
			),
		},
		totalNutrientsGrams: {
			carbs: Math.round(
				(nut.totalNutrientsGrams.carbs * servings) / newServings
			),
			protein: Math.round(
				(nut.totalNutrientsGrams.protein * servings) / newServings
			),
			fat: Math.round((nut.totalNutrientsGrams.fat * servings) / newServings),
		},
	};
};

export default totalNutrients;
