import { ActionType } from "../actions";
import { Action } from "../actions/action-Type";

const initialState = {

}

const rootReducer = (state = initialState, action: Action) => {
    switch(action.type){
        // case ActionType.EVENT  ejemplo de case.
        default: return state
    }
}

export default rootReducer