// import { Action } from 'history';
import { ActionType } from '../actions';
import { Action } from '../actions/action-Type';

const initialState = {
	allEvents: [],
	eventDetail: [],
	categories: [],
	cities: [],
	locations: [],
	// 	eventsFiltered: [],
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
		case ActionType.GET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		case ActionType.GET_EVENT_BY_CATEGORY:
			return {
				...state,
				allEvents: action.payload,
			};
		case ActionType.GET_CITIES:
			return {
				...state,
				cities: action.payload
			}
		case ActionType.GET_LOCATIONS:
			return {
				...state,
				locations: action.payload
			}
		default:
			return state;
	}
};

export default rootReducer;