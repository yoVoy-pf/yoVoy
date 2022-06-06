import { ActionType } from "./index";

interface GetAllEventAction {
    type: ActionType.GET_ALL_EVENT,
    payload: any // Se deja any para que no tire error pero especificar que tipo de datos va a manejar. ejemplo payload: string | number
}

interface GetSearchAction{
    type: ActionType.SEARCH_EVENT,
    payload: any
}

export type Action = GetAllEventAction | GetSearchAction

