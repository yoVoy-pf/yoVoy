import { ActionType } from '../actions';
import { Action } from '../actions/action-Type';

const initialState = {
	allEvents: [],
	eventDetail: [],
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
				eventDetail: action.payload,
			};
		case ActionType.CLEAR_EVENT_ID:
			return {
				...state,
				eventDetail: [],
			};
		default:
			return state;
	}
};

export default rootReducer;
