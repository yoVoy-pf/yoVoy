import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { State } from '../redux/store/store'
import {setCredentials, logOut} from './authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001',
  credentials: 'include', // this will send back the HTTP only secury cookie with the refresh token
  prepareHeaders: (Headers, {getState}) => {
    const token =  (getState() as State).auth.token
    if (token) {
      Headers.set('authorization', `Bearer ${token}`)
    }
    return Headers
  }
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403){
    console.log('sending refresh token')
    //send refresh token to get new access token
    const refreshResult = await baseQuery('/api/auth/refresh-token',api,extraOptions)
    console.log(refreshResult)
    if (refreshResult?.data){
      const user = api.getState().auth.user
      // store the new token
      api.dispatch(setCredentials({...(refreshResult.data as object), user}))
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions)
    }else{
      api.dispatch(logOut())
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})