import { apiSlice } from "../authentication/apiSlice";
import { User } from "../../types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[],void>({
      query: () => '/api/users',
    }),
    deleteUser: builder.mutation<User,{id: number}>({
      query(id) {
        return {
          url:`api/users/${id}`,
          method: `Delete`
        }
      }
    }) 
  })
})

export const{
  useGetUsersQuery,
  useDeleteUserMutation,
} = usersApiSlice