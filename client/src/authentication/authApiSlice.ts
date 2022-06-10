import { apiSlice } from "./apiSlice";

import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../authentication/authSlice';



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
    })
  })
})

export const {
  useLoginMutation,
  useGetUserAuthQuery,
  useRegisterMutation
} = authApiSlice