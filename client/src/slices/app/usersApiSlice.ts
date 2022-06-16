import { apiSlice } from "../authentication/apiSlice";
import { User, Event } from "../../types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getFavorites: builder.query<any,{_:string}>({
      query: ({_}) => '/api/user/favorites',
    }),
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
  useGetFavoritesQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApiSlice