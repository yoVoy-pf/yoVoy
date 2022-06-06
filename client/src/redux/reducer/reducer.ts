import { ActionType } from "../actions";
import { Action } from "../actions/action-Type";

const initialState = {
allEvents : [],
}

const rootReducer = (state = initialState, action: Action) => {
    switch(action.type){
        // case ActionType.EVENT  ejemplo de case.
        case ActionType.SEARCH_EVENT:
            
        return{
                ...state,
                allEvents: action.payload
            }
        default: return state
    }
}

export default rootReducer