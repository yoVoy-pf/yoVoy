import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../../slices/authentication/authSlice";
import rootReducer from '../reducer/reducer'
import { apiSlice } from "../../slices/authentication/apiSlice";

export const store = configureStore({
    reducer:{
      global: rootReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authSliceReducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

//se puede utilizar para el useSelector 
export type State = ReturnType<typeof store.getState>


// Se puede utilizar para el useDispatch
export type AppDispatch = typeof store.dispatch