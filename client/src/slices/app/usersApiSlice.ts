import { apiSlice } from "../authentication/apiSlice";
import { User } from "../../types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[],{_:string}>({
      query: ({_}) => '/api/users',
    }),
    getUser: builder.query<User,{id: any}>({
      query(id){
        console.log(id)
       return{ 
        url:`/api/users/${id}`,
       }
      }
    }),
    updateUser: builder.mutation<User[],{id: any, updateUser: any}>({
      query: ({id, ...updateUser}) => {
        return {
          url: `api/users/${id}`,
          method: `PUT`,
          body: {...updateUser}
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