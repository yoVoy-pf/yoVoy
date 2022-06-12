import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle";
import any from "react/jsx-runtime";
import { apiSlice } from "./apiSlice";
import { logOut, setCredentials } from './authSlice';



export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/api/auth/user/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    getUserAuth: builder.query<any, void>({
      query: () => '/api/auth/user/get-auth',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        try {
          const { data } = await queryFulfilled
          // `onSuccess` side-effect
          dispatch(setCredentials({ user: data?.data, accessToken: data?.accessToken }))
        } catch (err) {
          // `onError` side-effect
          console.log('Error fetching post!')
        }
      },
    }),
    register: builder.mutation({
      query: credentials => ({
        url: '/api/auth/user/register',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    logout: builder.mutation<any,void>({
      query: () => '/api/auth/user/logout',
      async onQueryStarted(_,{dispatch,queryFulfilled}){
        try{
          await queryFulfilled
          console.log('asd')
          dispatch(logOut())
        } catch(err){console.log(err)}
      }
    })
  })
})

export const {
  useLoginMutation,
  useGetUserAuthQuery,
  useRegisterMutation,
  useLogoutMutation
} = authApiSlice