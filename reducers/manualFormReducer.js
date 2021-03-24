const manualFormReducer = (state, action) => {
	switch (action.type) {
		case 'HANDLE_INPUT_TEXT':
			return {
				...state,
				[action.field]: action.payload,
			};
		case 'HANDLE_INPUT_CHECK':
			return {
				...state,
				checkboxes: { ...state.checkboxes, [action.field]: action.payload },
			};
		case 'RESET_FORM_STATE':
			return {
				recipeName: '',
				ingredients: '',
				servings: '',
				totalTime: '',
				instructions: '',
				imageLink: '',
				checkboxes: {
					dairyFree: false,
					glutenFree: false,
					sustainable: false,
					vegetarian: false,
					vegan: false,
				},
			};
		default:
			return state;
	}
};

export default manualFormReducer;
