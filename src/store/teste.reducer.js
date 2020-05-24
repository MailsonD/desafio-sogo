import { createReducer } from './util/create-reducer';

const initialState = {
	value: null,
};

export const teste = createReducer(initialState, {
	NEW_TEST: (state, action) => {
		console.log(action);
		return {
			value: action.value,
		};
	},
});
