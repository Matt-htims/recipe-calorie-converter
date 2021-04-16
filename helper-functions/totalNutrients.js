const totalNutrients = (nut, servings, newServings) => {
	return {
		calories: (nut.calories * servings) / newServings,
		totalDailyPercent: {
			carbs: (nut.totalDailyPercent.carbs * servings) / newServings,
			calories: (nut.totalDailyPercent.calories * servings) / newServings,
			fat: (nut.totalDailyPercent.fat * servings) / newServings,
			protein: (nut.totalDailyPercent.protein * servings) / newServings,
		},
		totalNutrientsGrams: {
			carbs: (nut.totalNutrientsGrams.carbs * servings) / newServings,
			protein: (nut.totalNutrientsGrams.protein * servings) / newServings,
			fat: (nut.totalNutrientsGrams.fat * servings) / newServings,
		},
	};
};

export default totalNutrients;
