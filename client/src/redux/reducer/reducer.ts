import { ActionType } from '../actions';
import { Action } from '../actions/action-Type';

const initialState = {
	allEvents: [],
	eventId: [],
};

const rootReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case ActionType.GET_ALL_EVENT:
			return {
				...state,
				allEvents: action.payload,
			};
		// case ActionType.EVENT  ejemplo de case.
		case ActionType.SEARCH_EVENT:
			return {
				...state,
				allEvents: action.payload,
			};
		case ActionType.GET_EVENT_ID:
			return {
				...state,
				eventId: action.payload,
			};
		case ActionType.CLEAR_EVENT_ID:
			return {
				...state,
				eventId: [],
			};
		default:
			return state;
	}
};

export default rootReducer;
