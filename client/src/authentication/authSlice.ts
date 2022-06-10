import { createSlice } from "@reduxjs/toolkit";
import { State } from "../redux/store/store";

const authSlice = createSlice({
  name: 'auth',
  initialState:{user: null, token: null},
  reducers:{
    setCredentials: (state, action) => {
      const {user, accessToken} = action.payload
      state.user = user
      state.token = accessToken
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    getState: (state) => state
  },
})

export const { setCredentials, logOut} = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state: State) => state.auth.user
export const selectCurrentToken = (state: State) => state.auth.token