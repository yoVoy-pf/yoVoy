import { ActionType } from "../actions";
import { Action } from "../actions/action-Type";

const initialState = {
    allEvents: [],
}

const rootReducer = (state = initialState, action: Action) => {
    switch(action.type){
        case ActionType.GET_ALL_EVENT:
            return {
                ...state,
                allEvents: action.payload
            }
        default: return state
    }
}

export default rootReducer