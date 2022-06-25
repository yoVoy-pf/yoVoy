import { apiSlice } from "../authentication/apiSlice";
import { Location } from '../../types'

interface LocationUpdate {
        name: string;
        address: string;
        map: string;
        cityId: string;
}

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getLocations: builder.query<Location[],({ _: string })>({
      query: ({ _ }) =>  '/api/locations'
    }),
    getLocation: builder.query<LocationUpdate, { id: any }>({
      query(id) {
        return {
          url: `/api/location/${id}`
        }
      }
    }),
    updateLocation: builder.mutation<Location[], { id: any; updateLocation: any }>({
			query: ({ id, ...updateLocation }) => {
				return {
					url: `api/location/${id}`,
					method: `PUT`,
					body: { ...updateLocation },
				};
			},
		}),
  })
})

export const{
  useGetLocationsQuery,
  useUpdateLocationMutation,
  useGetLocationQuery,
} = eventsApiSlice