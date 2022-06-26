import { createSlice } from "@reduxjs/toolkit";

const adminPanelSlice = createSlice({
  name: 'admin-panel',
  initialState:{AllUsers:{}, AllOrganizations:{}},
  reducers:{
    getAllUsers:(state, action) => {
      state.AllUsers = action.payload
    },
    getAllOrganizations:(state,action)=>{
      state.AllOrganizations = action.payload
    }
  },
})

export const { getAllUsers, getAllOrganizations} = adminPanelSlice.actions
export default adminPanelSlice.reducer

export const selectAllUsers = (state: any) => state.admin.AllUsers
export const selectAllOrganizations = (state: any) => state.admin.AllOrganizations