import { apiSlice } from "../authentication/apiSlice";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRequests: builder.query<any,({ _: string })>({
      query: ({ _ }) =>  '/api/requests'
    }),
    updateRequests: builder.mutation<any, { id: any; status: string }>({
			query: ({ id, ...status }) => {
				return {
					url: `api/request/${id}`,
					method: `PUT`,
					body: status,
				};
			},
		}),
    getRequest: builder.query<any, { id: any }>({
      query(id) {
        return {
          url: `/api/request/${id}`
        }
      }
    }),
  })
})

export const{
  useGetRequestQuery,
  useGetRequestsQuery,
  useUpdateRequestsMutation,
} = eventsApiSlice