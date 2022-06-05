import { configureStore } from "@reduxjs/toolkit";
import reducer from '../reducer/reducer'

export const store = configureStore({
    reducer
})

//se puede utilizar para el useSelector 
export type State = ReturnType<typeof store.getState>

// Se puede utilizar para el useDispatch
export type AppDispatch = typeof store.dispatch