import { createReducer } from '../util/create-reducer';
import { TOOGLE_MENU } from './menu.constants';

const initialState = {
	open: false,
};

export const menu = createReducer(initialState, {
	[TOOGLE_MENU]: toogleMenu,
});

function toogleMenu(state, action) {
	return {
		open: !state.open,
	};
}
