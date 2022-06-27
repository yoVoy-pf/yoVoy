import { createSlice } from "@reduxjs/toolkit";

const adminPanelSlice = createSlice({
  name: 'admin-panel',
  initialState:{AllUsers:{}, AllOrganizations:{}, AllLocations:{}, AllProvinces:{}},
  reducers:{
    getAllUsers:(state, action) => {
      state.AllUsers = action.payload
    },
    getAllOrganizations:(state,action)=>{
      state.AllOrganizations = action.payload
    },
    getAllLocations:(state,action)=>{
      state.AllLocations = action.payload
    },
    getAllProvinces:(state,action)=>{
      state.AllProvinces = action.payload
    }
  },
})

export const { getAllUsers, getAllOrganizations, getAllLocations, getAllProvinces} = adminPanelSlice.actions
export default adminPanelSlice.reducer

export const selectAllUsers = (state: any) => state.admin.AllUsers
export const selectAllOrganizations = (state: any) => state.admin.AllOrganizations
export const selectAllLocations = (state: any) => state.admin.AllLocations
export const selectAllProvinces = (state: any) => state.admin.AllProvinces