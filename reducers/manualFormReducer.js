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
		default:
			return state;
	}
};

export default manualFormReducer;
