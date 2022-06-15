import { apiSlice } from "../authentication/apiSlice";
import { User, Event } from "../../types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[],void>({
      query: () => '/api/users',
    }),
    getFavorites: builder.query<any,{_:string}>({
      query: ({_}) => '/api/user/favorites',
    }),
  })
})

export const{
  useGetUsersQuery,
  useGetFavoritesQuery
} = usersApiSlice