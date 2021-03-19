import React, { createContext, useReducer } from 'react';

const initialState = { counter: 1 };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'INCREMENT':
				return {
					...state,
					counter: state.counter + 1,
				};
			case 'DECREMENT':
				return {
					...state,
					counter: state.counter - 1,
				};
			default:
				return {
					...state,
				};
		}
	}, initialState);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
