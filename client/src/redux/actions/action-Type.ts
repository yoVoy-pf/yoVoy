import { ActionType } from "./index";

interface EventAction {
    type: ActionType.EVENT,
    payload: any // Se deja any para que no tire error pero especificar que tipo de datos va a manejar. ejemplo payload: string | number
}

export type Action = EventAction