import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../../authentication/authSlice";
import rootReducer from '../reducer/reducer'

export const store = configureStore({
    reducer:{
      global: rootReducer,
      auth: authSliceReducer
    }
})

//se puede utilizar para el useSelector 
export type State = ReturnType<typeof store.getState>


// Se puede utilizar para el useDispatch
export type AppDispatch = typeof store.dispatch