const recipeDataReducer = (state, action) => {
	switch (action.type) {
		case 'SEARCH_DATA_REQUEST':
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		case 'SEARCH_DATA_SUCCESS':
			return {
				...state,
				isLoading: false,
				isError: false,
				recipe: action.payload,
			};
		case 'SEARCH_DATA_FAILURE':
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		default:
			throw new Error();
	}
};

export default recipeDataReducer;
