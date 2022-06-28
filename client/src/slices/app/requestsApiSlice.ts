import { apiSlice } from "../authentication/apiSlice";
import { setRequests } from "../requestSlice";

export const requestsApiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
      getUserRequests: builder.mutation<any,any>({
        query: () => `/api/user/requests`,
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try{
            const { data } = await queryFulfilled
            console.log(data)
            dispatch(setRequests(data))
          }catch(err){
            console.log('Error fetching post!')
            console.log(err)
          }
        }
      })
  }),
})
  
export const{
    useGetUserRequestsMutation,
  } = requestsApiSlice