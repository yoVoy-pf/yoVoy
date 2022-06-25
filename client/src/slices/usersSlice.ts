import { createSlice } from "@reduxjs/toolkit";
import { State } from "../redux/store/store";

const usersSlice = createSlice({
  name: 'users',
  initialState:{AllUsers:{}, userSearch: {}},
  reducers:{
    getAllUsers:(state, action) => {
      state.AllUsers = action.payload
    },
    getUserSearch:(state, action) => {
      state.userSearch = action.payload
    },
    getState: (state) => state
  },
})

export const { getAllUsers, getUserSearch} = usersSlice.actions
export default usersSlice.reducer

export const selectAllUsers = (state: State) => state.users.AllUsers