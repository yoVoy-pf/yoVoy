import { ActionType } from "./index";
import { Dispatch } from "redux";
import { Action } from "./action-Type";
import axios from "axios";

// Ejemplo de como se puede realizar las acciones
// export const getEvent = () => {
//     return async function (dispatch: Dispatch) {
//         try {
//             const event = await axios('http://localhost:3001/event')
//             dispatch({ 
//                 type: ActionType.EVENT, 
//                 payload: event.data
//             })
//         } catch (error) {
//             console.error('Error la acciones de event');
//         }
//     }
// }