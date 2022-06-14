import { apiSlice } from "../authentication/apiSlice";
import { User } from "../../types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[],void>({
      query: () => '/api/users',
    }),
    getUser: builder.query<User,{id: string}>({
      query(id){
        console.log(id)
       return{ 
        url:`/api/users/${id}`,
       }
      }
    }),
    updateUser: builder.mutation<User[],{id: any, newUser: any}>({
      query: ({id, ...newUser}) => {
        return {
          url: `api/users/${id}`,
          method: `PUT`,
          body: {...newUser}
        }
      }
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
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApiSlice