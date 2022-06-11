import { apiSlice } from "../authentication/apiSlice";
import { User } from "../types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[],void>({
      query: () => '/api/users',
    })
  })
})

export const{
  useGetUsersQuery
} = usersApiSlice