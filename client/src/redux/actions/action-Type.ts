import { ActionType } from './index';

interface GetAllEventAction {
	type: ActionType.GET_ALL_EVENT;
	payload: any; // Se deja any para que no tire error pero especificar que tipo de datos va a manejar. ejemplo payload: string | number
}

interface GetSearchAction {
	type: ActionType.SEARCH_EVENT;
	payload: any;
}

interface getEventIdAction {
	type: ActionType.GET_EVENT_ID;
	payload: any;
}

interface clearEventIdAction {
	type: ActionType.CLEAR_EVENT_ID;
}

export type Action =
	| GetAllEventAction
	| GetSearchAction
	| getEventIdAction
	| clearEventIdAction;
