import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const dayInitialState = { breakfast: [], lunch: [], dinner: [], snack: [] };

export const weekPlannerState = create(
	persist(
		set => ({
			monday: dayInitialState,
			tuesday: dayInitialState,
			wednesday: dayInitialState,
			thursday: dayInitialState,
			friday: dayInitialState,
			saturday: dayInitialState,
			sunday: dayInitialState,
			addMeal: (day, meal, recipe) =>
				set(state => ({
					[day]: {
						...state[day],
						[meal]: [...state[day][meal], recipe],
					},
				})),
			removeMeal: (day, meal, id) =>
				set(state => ({
					[day]: {
						...state[day],
						[meal]: state[day][meal].filter(recipe => recipe.id !== id),
					},
				})),
			resetDay: day => set(state => ({ [day]: dayInitialState })),
			resetAll: () =>
				set(state => ({
					monday: dayInitialState,
					tuesday: dayInitialState,
					wednesday: dayInitialState,
					thursday: dayInitialState,
					friday: dayInitialState,
					saturday: dayInitialState,
					sunday: dayInitialState,
				})),
		}),
		{
			name: 'week-storage',
			getStorage: () => sessionStorage,
		}
	)
);
